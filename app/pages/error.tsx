import type {Route} from "./+types/error";
import {Main} from "~/components/Main";
import {Container} from "~/components/Container";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Error 404"},
        {name: "description", content: "No pages found."},
    ];
}
export default function Error() {
    return (
        <Main>
            <Container className="flex min-h-80 items-center justify-center flex-col text-center py-6">
                <h1 className="text-center text-2xl font-bold mb-4">404</h1>
                <p>No pages found</p>
            </Container>
        </Main>
    );
}