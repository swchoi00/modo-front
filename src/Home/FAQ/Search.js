import { Link } from "react-router-dom";
import './Search.css';

// Faq.js 안에 들어가는 내용
function Search({ data, currentPage, itemsPerPage, path, ad, selectedCategory }) {

    console.log(currentPage);

    return (
        <div className="search-container">

            <table className="faq-table">
                <tbody className="faq-tbody">
                    {data
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((item, i) => (
                            <tr key={i} className="faq-tr">
                                <td className="faq-td"><Link
                                    to={{
                                        pathname: `${ad}/${item.no}`,
                                        state: {
                                            currentPage
                                        },
                                    }}
                                >
                                    {item.title}
                                </Link></td>
                            </tr>
                        ))}
                </tbody>

            </table>

        </div>
    )
}

export default Search;