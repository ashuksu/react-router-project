import {Main} from "~/components/Main";
import {Container} from "~/components/Container";

export default function History() {
    return (
        <Main>
            <Container className="flex min-h-80 items-center justify-center flex-col text-center py-6">
                <h1 className="text-center text-2xl font-bold mb-4">History</h1>
            </Container>
        </Main>
    );
}