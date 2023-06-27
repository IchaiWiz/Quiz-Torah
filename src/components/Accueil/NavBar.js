import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Popper from "@mui/material/Popper";
import GroupedSelect from "./GroupedSelect";
import MyDrawer from "./Drawer";
import CategoryContext from "./CategoryContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: "15px",
  width: "20%",
  marginLeft: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function SearchAppBar() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [isCategoryFromSearch, setIsCategoryFromSearch] = React.useState(false);
  const [selectedSearchResult, setSelectedSearchResult] = React.useState(null);

  const {
    setSelectedCategory,
  } = React.useContext(CategoryContext);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleItemClick = (result) => {
    setSelectedSearchResult(result);
    setIsCategoryFromSearch(true);
    setSearchTerm('');
    setOpen(false);
  };

// Ajoutez ce hook useEffect pour surveiller les changements de isCategoryFromSearch
React.useEffect(() => {
  if (isCategoryFromSearch && selectedSearchResult) {
    setSelectedCategory(selectedSearchResult);
  }
}, [isCategoryFromSearch, selectedSearchResult, setSelectedCategory]);


const handleCategorySelect = (category) => {
  if (isCategoryFromSearch) {
    setIsCategoryFromSearch(false);
  }
  setSelectedCategory(category);
};


  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        fetch(`http://localhost:5000/search?q=${searchTerm}`)
          .then(response => response.json())
          .then(data => {
            setSearchResults(data);
            setOpen(true);
          })
          .catch(error => console.error('Error fetching search results:', error));
      } else {
        setSearchResults([]);
        setOpen(false);
      }
    }, 300); // délai de 300ms

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: "none", sm: "block" } }}
                >
                    Choisissez votre quiz :
                </Typography>
                <GroupedSelect isCategoryFromSearch={isCategoryFromSearch} onCategorySelect={handleCategorySelect} />

                <Search ref={anchorRef}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ "aria-label": "search" }}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Search>
                <MyDrawer />
            </Toolbar>
            <Popper open={open} anchorEl={anchorRef.current} placement="bottom-start">
                <ClickAwayListener onClickAway={handleClose}>
                    <Paper sx={{ width: "100%" }}>
                        <List>
                            {searchResults.slice(0, 5).map((result, index) => (
                                <ListItem key={index} button onClick={() => handleItemClick(result)}>
                                    {result.name}
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </AppBar>
    </Box>
  );
}
