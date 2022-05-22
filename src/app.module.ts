import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { Module, ValidationPipe } from "@nestjs/common"
import { APP_PIPE } from "@nestjs/core"
import { GraphQLModule } from "@nestjs/graphql"
import { AppResolver } from "./app.resolver"
import { ConfigModule } from "./config"

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      sortSchema: true,
    }),
    ConfigModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    AppResolver,
  ],
})
export class AppModule {}
