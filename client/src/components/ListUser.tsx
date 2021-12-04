const people = [
    {
        name: 'Calvin Hawkins',
        email: 'calvin.hawkins@example.com',
        image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastMessage: 'hello',
    },
    {
        name: 'Kristen Ramos',
        email: 'kristen.ramos@example.com',
        image: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastMessage: 'what is your name??????????????????????????????111111111111',
    },
    {
        name: 'Ted Fox',
        email: 'ted.fox@example.com',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastMessage: 'nice to meet you',
    },
];

export default function ListUser() {
    return (
        <ul role="list" className="divide-y divide-gray-200">
            {people.map((person) => (
                <li key={person.email} className="py-4 flex">
                    <div className="relative">
                        <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                        <div className="rounded-full border-white border-2 w-3 h-3 bg-green-500 absolute right-0 bottom-1"></div>
                    </div>

                    <div className="ml-3">
                        <p className="text-lg font-medium text-gray-900 m-auto">{person.name}</p>
                        <p className="text-sm text-gray-500 m-auto">
                            {person.lastMessage.length < 40
                                ? person.lastMessage
                                : person.lastMessage.substring(0, 37) + '...'}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
}
