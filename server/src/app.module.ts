import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ClientsModule } from './clients/clients.module';
import { ReportsModule } from './reports/reports.module';
import { MediaModule } from './media/media.module';
import { SubcontractorsModule } from './subcontractors/subcontractors.module';
import { DesignersModule } from './designers/designers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { ReportSectionsModule } from './report-sections/report-sections.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';


dotenv.config();
const nodeEnvironment = `${(
  process.env.NODE_ENV || 'development'
).toLowerCase()}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/${nodeEnvironment}.env`,
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, 
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      introspection: true,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      sortSchema: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        seeds: [__dirname + '**/*.seed{.ts,.js}'],
        factories: [__dirname + '**/*.factory{.ts,.js}'],
        synchronize: true,
        logging: nodeEnvironment === 'development' ? true : false,
        dropSchema: nodeEnvironment === 'test' ? true : false,
        // ssl: true,
        // extra: {
        ssl: {
          rejectUnauthorized: false,
        },
        // },
        // ssl: false
        // ssl: true,
        // ssl: {
        //   rejectUnauthorized: false,
        // },
      }),
    }),
    UsersModule, ProjectsModule, ClientsModule, ReportsModule, MediaModule, SubcontractorsModule, DesignersModule, ReportSectionsModule, AuthModule,  MulterModule.register({
      dest: './uploads',
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
