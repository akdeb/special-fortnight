import { Movie } from "../entity/Movie";
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";

@InputType()
class MovieInput {
    @Field(() => String)
    title: string;

    @Field(() => Int)
    minutes: number;
}

@InputType()
class MovieUpdateInput {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => Int, { nullable: true })
    minutes?: number;
}

@Resolver()
export class MovieResolver {
    // when you want to post or update dB
    @Mutation(() => Movie)
    async createMovie(
        // @Arg("title", () => String) title: string,
        // @Arg("minutes", () => Int) minutes: number,

        // another way to pass in objects
        @Arg("options", () => MovieInput) options: MovieInput,
    ) {
        // await Movie.insert(options);
        const movie = await Movie.create(options).save();
        return movie;
    }

    // when you wanna update stuff
    @Mutation(() => Boolean)
    async updateMovie(@Arg("id", () => Int) id: number, @Arg("input", () => MovieUpdateInput) input: MovieInput) {
        await Movie.update({ id }, input);
        return true;
    }

    // delete stuff with this mutation
    @Mutation(() => Boolean)
    async deleteMovie(
        @Arg("id", () => Int) id: number,
    ) {
        await Movie.delete({ id })
        return true;
    }

    // when you want to fetch stuff
    @Query(() => [Movie])
    movies() {
        return Movie.find();
    }
}
