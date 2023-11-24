import React from 'react'

function Loader() {
  return (
    <>
    <div class="d-flex justify-content-center mt-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-border text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-border text-dark" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
    </>
  )
}

export default Loader