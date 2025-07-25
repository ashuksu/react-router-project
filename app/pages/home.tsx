import type {Route} from "./+types/home";
import {Main} from "~/components/Main";
import {Container} from "~/components/Container";
import {TimeEntryBlock} from "~/components/TimeEntryBlock";
import {Button} from "~/components/Button";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Work Log App"},
        {name: "description", content: "Track your work time efficiently."},
    ];
}

export default function Home() {
    return (
        <Main>
            <Container>
                <TimeEntryBlock/>
                <Button className="bg-green-600 hover:bg-green-700">
                    Add New Block
                </Button>
            </Container>
        </Main>
    );
}