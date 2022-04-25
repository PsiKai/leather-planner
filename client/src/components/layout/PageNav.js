import React, { useEffect, useState } from "react"
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined"
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined"
import "../../styles/page-nav.css"

const PageNav = ({ changePages, totalRecords, resultsPerPage, loading }) => {
  const [page, setPage] = useState(0)

  useEffect(() => changePages(page), [page, changePages])

  const incerementPage = e => {
    const incerement = +e.currentTarget.value
    setPage(prev => prev + incerement)
  }

  const mapPages = () => {
    let totalPages = []

    for (let i = 0; i < totalRecords / resultsPerPage; i++) {
      totalPages.push(i + 1)
    }
    return totalPages.map(v => (
      <span className={`page-nav--page-num ${page / resultsPerPage === +v - 1 ? "page-nav--page-active" : ""}`} key={v}>
        {v}
      </span>
    ))
  }
  return (
    <div className="page-nav--container">
      <div className="page-nav--navbar">
        <button className="page-nav--button" onClick={incerementPage} value={-1 * resultsPerPage} disabled={loading || page === 0}>
          <ArrowBackIosOutlinedIcon />
        </button>
        <div className="page-nav--pages">{mapPages()}</div>
        <button
          className="page-nav--button"
          onClick={incerementPage}
          value={resultsPerPage}
          disabled={loading || page + resultsPerPage > totalRecords}
        >
          <ArrowForwardIosOutlinedIcon />
        </button>
      </div>
      <span className="page-nav--totals">{`showing ${page + 1}-${
        page + resultsPerPage > totalRecords ? totalRecords : page + resultsPerPage
      } of ${totalRecords}`}</span>
    </div>
  )
}

export default PageNav
