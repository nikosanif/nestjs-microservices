import { Inject, Injectable } from '@nestjs/common';
import { Err, Ok, Result } from 'ts-results';

import { NotFoundException } from '@nmsvc/sdk/exceptions';
import { Pagination } from '@nmsvc/sdk/types';
import { slugify } from '@nmsvc/sdk/utils';

import {
  OrganizationAlreadyExistsError,
  OrganizationCreationError,
  OrganizationEntity,
  OrganizationNotFoundError,
  OrganizationRepositoryPort,
  OrganizationUpdateError,
} from '../domain';
import { ORGANIZATION_REPOSITORY } from '../organizations.di-tokens';

import { CreateOrganizationCommand, UpdateOrganizationCommand } from './commands';
import {
  FindByIdOrganizationQuery,
  FindOneOrganizationQuery,
  FindOrganizationsQuery,
} from './queries';

@Injectable()
export class OrganizationsFacade {
  constructor(
    @Inject(ORGANIZATION_REPOSITORY)
    protected readonly organizationRepository: OrganizationRepositoryPort
  ) {}

  async create(
    command: CreateOrganizationCommand
  ): Promise<Result<OrganizationEntity, OrganizationCreationError>> {
    const organization = await this.toDomain(command);
    const result = await this.organizationRepository.create(organization);

    // convert the generic error to a domain error
    return result.mapErr(error => new OrganizationAlreadyExistsError(error));
  }

  async findById(
    query: FindByIdOrganizationQuery
  ): Promise<Result<OrganizationEntity, OrganizationNotFoundError>> {
    const found = await this.organizationRepository.findById(query.organizationId);

    if (found.none) {
      return new Err(new OrganizationNotFoundError());
    }

    return new Ok(found.unwrap());
  }

  async findPaginated(query: FindOrganizationsQuery): Promise<Pagination<OrganizationEntity>> {
    const { slug, ownerUserId, page, perPage, populate } = query;

    return this.organizationRepository.findAllPaginated(page, perPage, {
      where: { slug, ownerUserId },
      relations: populate,
    });
  }

  async findOne(
    query: FindOneOrganizationQuery
  ): Promise<Result<OrganizationEntity, OrganizationNotFoundError>> {
    const found = await this.organizationRepository.findOne(query.options);

    if (found.none) {
      return new Err(new OrganizationNotFoundError());
    }

    return new Ok(found.unwrap());
  }

  async update(
    command: UpdateOrganizationCommand
  ): Promise<Result<OrganizationEntity, OrganizationUpdateError>> {
    const { organizationId, orgProps } = command;

    const result = await this.organizationRepository.updateById(organizationId, orgProps);

    // convert the generic error to a domain error
    return result.mapErr(error => {
      if (error instanceof NotFoundException) {
        return new OrganizationNotFoundError(error);
      }
      return new OrganizationAlreadyExistsError(error);
    });
  }

  private async toDomain(command: CreateOrganizationCommand): Promise<OrganizationEntity> {
    const organization = new OrganizationEntity();
    organization.slug = slugify(command.name);
    organization.name = command.name;
    organization.ownerUserId = command.ownerUserId;
    organization.description = command.description;
    organization.location = command.location;
    organization.website = command.website;
    organization.email = command.email;
    organization.phoneNumber = command.phoneNumber;

    return organization;
  }
}
