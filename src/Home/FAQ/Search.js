import { Link } from "react-router-dom";
import './Search.css';

function Search( {data, currentPage, itemsPerPage , path , ad, selectedCategory} ) {

    return (
        <div className="search-container">

            <table className="faq-table">
                <tbody className="faq-tbody">
                    {data
                        .slice((currentPage -1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((data, i) => (
                            <tr key={i} className="faq-tr">
                                <td className="faq-td"><Link to={`${ad}/${data.no}`}>{data.title}</Link></td>
                            </tr>
                        ))}
                </tbody>

            </table>

        </div>
    )
}

export default Search;