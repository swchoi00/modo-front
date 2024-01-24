import { Pagination, Stack } from "@mui/material";

function PaginationComponent({ currentPage, itemsPerPage, totalItems, onPageChange }) {
    const pageCount = Math.ceil(totalItems / itemsPerPage);
    console.log(totalItems);

    console.log("pageCount : " + pageCount);
    console.log("totalItems:", totalItems);
    console.log("itemsPerPage:", itemsPerPage);
    const totalCount = totalItems + itemsPerPage;
    console.log("totalCount:", totalCount);


    return (
        <Stack spacing={2} className="stackpag">

            <Pagination
                className="pagination"
                count={pageCount}
                page={currentPage}
                onChange={(event, page) => onPageChange(page)}
                shape="rounded"
            />
        </Stack>
    )
}

export default PaginationComponent;