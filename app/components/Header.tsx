import {Link} from "react-router";
import {Container} from '~/components/Container';

export default function Header() {
    return (
        <header className="py-6 text-2xl font-semibold text-gray-300-600 space-x-4 bg-white dark:bg-gray-950">
            <Container className="flex justify-between">
                <h2 className="flex items-center space-x-6">
                    <div>
                        <span className="text-gray-400">Today: </span>
                        1h 15m
                    </div>
                    <div>
                        <span className="text-gray-400">Month: </span>
                        102h 37m
                    </div>
                </h2>
                <nav className="flex justify-center space-x-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/about" className="hover:underline">History</Link>
                </nav>
            </Container>
        </header>
    );
}