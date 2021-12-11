import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { RequestsService } from '../requests/requests.service';
import { Request } from '../requests/request.entity';
import { AnalyticsData, GetAnalyticsDto } from './analytics.dto';

class AnalyticsMap extends Map<string, number> {}

type AnalyticsKeyMapperFn = (request: Request) => string;

@Injectable()
export class AnalyticsService {
  constructor(private readonly requestsService: RequestsService) {}

  async getRequestTypesAnalyticsForUser(user: User): Promise<GetAnalyticsDto> {
    return this.getRequestsAnalyticsForUser(user, (request: Request) => request.type.id);
  }

  async getRequestTypesAnalyticsForAdmin(): Promise<GetAnalyticsDto> {
    return this.getRequestsAnalyticsForAdmin((request: Request) => request.type.id);
  }

  async getRequestStatusesAnalyticsForUser(user: User): Promise<GetAnalyticsDto> {
    return this.getRequestsAnalyticsForUser(user, (request: Request) => request.status.id);
  }

  async getRequestStatusesAnalyticsForAdmin(): Promise<GetAnalyticsDto> {
    return this.getRequestsAnalyticsForAdmin((request: Request) => request.status.id);
  }

  async getRequestAnalyticsByDayForUser(user: User): Promise<GetAnalyticsDto> {
    const requests: Request[] = await this.requestsService.getForUser(user);

    return this.getRequestAnalyticsByDay(requests);
  }

  async getRequestAnalyticsByDayForAdmin(): Promise<GetAnalyticsDto> {
    const requests: Request[] = await this.requestsService.getAll();

    return this.getRequestAnalyticsByDay(requests);
  }

  async getFeedbackAnalytics(): Promise<GetAnalyticsDto> {
    const requests: Request[] = await this.requestsService.getAll();

    const data: AnalyticsData[] = [];
    let counter = 0;

    requests.forEach(({ rating }: Request) => {
      if (rating && rating > 0) {
        data.push({
          label: counter.toString(),
          value: rating,
        });

        counter++;
      }
    });

    return { data };
  }

  async getRequestsAssigneeAnalytics(): Promise<GetAnalyticsDto> {
    const requests: Request[] = await this.requestsService.getAll();

    let assignedCounter = 0;
    let unassignedCounter = 0;

    requests.forEach(({ assignedTo }: Request) => {
      if (assignedTo && assignedTo.id) {
        assignedCounter++;
      } else {
        unassignedCounter++;
      }
    });

    return {
      data: [
        { label: 'Назначенные', value: assignedCounter },
        { label: 'Неназначенные', value: unassignedCounter },
      ],
    };
  }

  private async getRequestsAnalyticsForUser(user: User, keyMapper: AnalyticsKeyMapperFn): Promise<GetAnalyticsDto> {
    const requests: Request[] = await this.requestsService.getForUser(user);

    return this.getRequestAnalytics(requests, keyMapper);
  }

  private async getRequestsAnalyticsForAdmin(keyMapper: AnalyticsKeyMapperFn): Promise<GetAnalyticsDto> {
    const requests: Request[] = await this.requestsService.getAll();

    return this.getRequestAnalytics(requests, keyMapper);
  }

  private getRequestAnalytics(requests: Request[], keyMapper: AnalyticsKeyMapperFn): GetAnalyticsDto {
    const map: AnalyticsMap = this.createRequestsAnalyticsMap(requests, keyMapper);

    return this.mapToAnalyticsData(map);
  }

  private createRequestsAnalyticsMap(requests: Request[], keyMapper: AnalyticsKeyMapperFn): AnalyticsMap {
    const map = new AnalyticsMap();

    requests.forEach((request: Request) => {
      const key: string = keyMapper(request);

      if (map.has(key)) {
        map.set(key, map.get(key) + 1);
      } else {
        map.set(key, 1);
      }
    });

    return map;
  }

  private mapToAnalyticsData(map: AnalyticsMap): GetAnalyticsDto {
    const data: AnalyticsData[] = [];

    map.forEach((value: number, key: string) => {
      data.push({ label: key, value });
    });

    return { data };
  }

  private getRequestAnalyticsByDay(requests: Request[]): GetAnalyticsDto {
    const byDaysOfWeek = new Array<number>(7).fill(0);

    requests.forEach((request: Request) => {
      byDaysOfWeek[request.createdAt.getDay()]++;
    });

    return {
      data: byDaysOfWeek.map((value: number, index: number) => ({
        label: index.toString(),
        value,
      })),
    };
  }
}
