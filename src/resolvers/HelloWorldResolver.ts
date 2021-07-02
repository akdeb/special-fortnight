import { Query, Resolver } from "type-graphql";

// resolver in graphql
@Resolver()
export class HelloWorldResolver {

  // query, it's a function that returns a string
  @Query(() => String)
  hello() {
    return "hi!";
  }
}
