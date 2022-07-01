import { Body, Controller, Param, Post } from '@nestjs/common';
import { ResourceService } from './resource.service';

@Controller(':dataSourceName')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post('/:resourceName')
  async insert(
    @Param('dataSourceName') dataSourceName: string,
    @Param('resourceName') resourceName: string,
    @Body() data: Record<any, any>,
  ) {
    return await this.resourceService.insert({
      data,
      dataSourceName,
      resourceName,
    });
  }
}
