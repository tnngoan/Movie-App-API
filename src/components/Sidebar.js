import React from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./Sidebar.css";

export default function Sidebar({
  genreList,
  onCategoryChange,
  onGenreSelect,
  onSortRating,
  onSortPopularity,
}) {
  return (
    <SideNav className="sideBar">
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="nowPlaying">
        <NavItem eventKey="home">
          <NavIcon>
            <i className="fas fa-fw fa-home" style={{ fontSize: "0.5em" }} />
          </NavIcon>
          <NavText>One More EPISODE</NavText>
        </NavItem>

        <NavItem eventKey="nowPlaying">
          <NavIcon>
            <i className="fa fa-fw fa-film" style={{ fontSize: "0.5em" }} />
          </NavIcon>
          <NavText onClick={() => onCategoryChange("now_playing")}>
            Now Playing
          </NavText>
        </NavItem>

        <NavItem eventKey="upComing">
          <NavIcon>
            <i className="fa fa-fw fa-calendar" style={{ fontSize: "0.5em" }} />
          </NavIcon>
          <NavText onClick={() => onCategoryChange("upcoming")}>
            Up Coming
          </NavText>
        </NavItem>

        <NavItem eventKey="topRated">
          <NavIcon>
            <i className="fa fa-fw fa-star" style={{ fontSize: "0.5em" }} />
          </NavIcon>
          <NavText onClick={() => onCategoryChange("top_rated")}>
            Top Rated
          </NavText>
          <NavItem eventKey="highRated">
            <NavText onClick={() => onSortRating(false)}>High Rated</NavText>
          </NavItem>
          <NavItem eventKey="lowRated">
            <NavText onClick={() => onSortRating(true)}>Low Rated</NavText>
          </NavItem>
        </NavItem>

        <NavItem eventKey="popular">
          <NavIcon>
            <i className="fa fa-fw fa-fire" style={{ fontSize: "0.5em" }} />
          </NavIcon>
          <NavText onClick={() => onCategoryChange("popular")}>
            Popular
          </NavText>
          <NavItem eventKey="mostPopular">
            <NavText onClick={() => onSortPopularity(false)}>
              Most Popular
            </NavText>
          </NavItem>
          <NavItem eventKey="leastPopular">
            <NavText onClick={() => onSortPopularity(true)}>
              Least Popular
            </NavText>
          </NavItem>
        </NavItem>

        <NavItem eventKey="category">
          <NavIcon>
            <i className="fa fa-fw fa-list" style={{ fontSize: "0.5em" }} />
          </NavIcon>
          <NavText>Category</NavText>
          {genreList &&
            genreList.map((genre) => (
              <NavItem key={genre.id} eventKey={`genre-${genre.id}`}>
                <NavText onClick={() => onGenreSelect(genre.id)}>
                  {genre.name}
                </NavText>
              </NavItem>
            ))}
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}
