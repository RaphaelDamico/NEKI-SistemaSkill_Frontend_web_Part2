import { EmptyListCardContainer } from "./styles";

interface EmptyListCardProps {
    title: string;
    text: string;
}

export default function EmptyListCard({ title, text }: EmptyListCardProps) {
    return (
        <EmptyListCardContainer>
            <h1>{title}</h1>
            <p>{text}</p>
        </EmptyListCardContainer>

    );
}