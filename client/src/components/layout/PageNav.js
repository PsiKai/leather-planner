import React, { useEffect, useState } from "react"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined"
import "../../styles/page-nav.css"

const PageNav = ({ totalRecords, resultsPerPage, loading, setPage, page }) => {
  const incerementPage = e => {
    const incerement = +e.currentTarget.value
    setPage(prev => prev + incerement)
  }

  const [visibility, setVisbility] = useState(
    totalRecords > resultsPerPage ? { opacity: "1" } : { opacity: "0" },
  )

  const mapPages = () => {
    let totalPages = []

    for (let i = 0; i < totalRecords / resultsPerPage; i++) {
      totalPages.push(i + 1)
    }
    return totalPages.map(v => (
      <span
        className={`page-nav--page-num ${page / resultsPerPage === +v - 1 ? "page-nav--page-active" : ""}`}
        key={v}
      >
        {v}
      </span>
    ))
  }

  useEffect(() => {
    setVisbility(totalRecords > resultsPerPage ? { opacity: "1" } : { opacity: "0" })
  }, [resultsPerPage, totalRecords])

  return (
    <div className="page-nav--container">
      <span
        className="page-nav--totals"
        style={!totalRecords ? visibility : {}}
      >{`showing ${page + 1}-${
        page + resultsPerPage > totalRecords ? totalRecords : page + resultsPerPage
      } of ${totalRecords}`}</span>
      <div className="page-nav--navbar" style={visibility}>
        <button
          className="page-nav--button"
          onClick={incerementPage}
          value={-1 * resultsPerPage}
          disabled={loading || page === 0}
        >
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
    </div>
  )
}

export default PageNav
