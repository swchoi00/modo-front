import { Link } from "react-router-dom";
import './Search.css';

// Faq.js 안에 들어가는 내용
function Search({ data, currentPage, itemsPerPage, path, ad, selectedCategory }) {


    console.log(data);

    return (
        <div className="search-results">

            <table className="faq-table">
                <tbody className="faq-tbody">
                    {data
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((item, i) => (
                            <tr key={i} className="faq-tr">
                                <td className="faq-td"><Link
                                    to={{
                                        pathname: `${ad}/${item.id}`,
                                        state: {
                                            currentPage
                                        },
                                    }}
                                >
                                    {item.title}
                                {item.answerChk === true && 
                                <span 
                                style={{ 
                                    marginLeft: '0.5rem', 
                                    color: 'white', 
                                    backgroundColor : '#6A60A9',
                                    borderRadius : '5px',
                                    padding : '0.3rem'
                                    }}>답변 완료</span>}
                                </Link></td>
                                
                            </tr>
                        ))}
                </tbody>

            </table>

        </div>
    )
}

export default Search;