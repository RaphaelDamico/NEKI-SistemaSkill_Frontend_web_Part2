import Icon from "../Icon";
import { ArrowButton, ArrowContainer, PageCounter } from "./styles";

interface PaginationProps {
    page: number;
    handlePageChange: (page: number | ((prev: number) => number)) => void;
    totalPages: number
}

export default function Pagination({page, handlePageChange, totalPages}: PaginationProps) {
    return(
        <ArrowContainer>
        <ArrowButton
            isDisabled={page === 0}
            onClick={() => {
                if (page > 0) handlePageChange((prev) => prev - 1);
            }}
        >
            <Icon name="arrowLeft" size={30} />
        </ArrowButton>
            <PageCounter>{page + 1}/{totalPages}</PageCounter>
        <ArrowButton
            isDisabled={page === totalPages - 1}
            onClick={() => {
                if (page < totalPages - 1) handlePageChange((prev) => prev + 1);
            }}
        >
            <Icon name="arrowRight" size={30} />
        </ArrowButton>
    </ArrowContainer>
    );
};