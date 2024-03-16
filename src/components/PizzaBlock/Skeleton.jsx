import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={0}
    width={280}
    height={458}
    viewBox="0 0 280 458"
    backgroundColor="#f3f3f3"
    foregroundColor="#f3f3f3"
    {...props}>
    <circle cx="140" cy="130" r="130"/>
    <rect x="0" y="270" rx="10" ry="10" width="280" height="24"/>
    <rect x="0" y="314" rx="20" ry="20" width="280" height="84"/>
    <rect x="0" y="416" rx="10" ry="10" width="85" height="42"/>
    <rect x="130" y="416" rx="10" ry="10" width="150" height="42"/>
  </ContentLoader>
)

export default Skeleton;
