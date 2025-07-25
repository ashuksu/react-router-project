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
                <div className="flex items-center justify-between space-x-4">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                        Add New Block
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                        Save All
                    </Button>
                </div>
            </Container>
        </Main>
    );
}