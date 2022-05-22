import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { Module } from "@nestjs/common"
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
  providers: [AppResolver],
})
export class AppModule {}
