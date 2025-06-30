import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60, // Time to live (seconds)
          limit: 10, // Max number of requests within ttl
        },
      ],
    }),
  ],
  exports: [ThrottlerModule],
})
export class AppThrottlerModule {}
