import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignUpPage from "./pages/sign-up-page/SignUpPage";
import SignInPage from "./pages/sign-in-page/SignInPage";
import SudokuPage from "./pages/sudoku-page/SudokuPage";
import LevelSelectorPage from "./pages/level-selector-page/LevelSelectorPage";
import CreateSudokuPage from "./pages/create-sudoku-page/CreateSudokuPage";
import ProtectedRoutes from "./ProtectedRoutes";
import HomePage from "./pages/home-page/HomePage";
import {setAuthToken} from "./utils/setAuthToken";
import OauthSignInPage from "./pages/oauth-sign-in-page/OauthSignInPage";
import RedirectPage from "./pages/redirect-page/RedirectPage";
import PageNotFound from "./pages/page-not-found/PageNotFound";

import OtherGamesPage from "./pages/other-games-page/OtherGamesPage";

import OldWordGuesser from "./pages/old-word-guesser-page/OldWordGuesser";
import WordGuesser from "./pages/word-guesser-page/WordGuesser";
import RefreshWordGuesser from "./pages/word-guesser-refresh/RefreshWordGuesser"

import CrosswordPage from "./pages/crossword-page/CrosswordPage";
import CrosswordSelectorPage from "./pages/crossword-selector-page/CrosswordSelectorPage";
import CreateCrosswordPage from "./pages/create-crossword-page/CreateCrosswordPage";

import SlidingSelectorPage from "./pages/sliding-selector-page/SlidingSelectorPage";
import SlidingPuzzlePage from "./pages/sliding-puzzle-page/SlidingPuzzlePage";
import CreateSlidingPuzzlePage from "./pages/create-sliding-puzzle-page/CreateSlidingPuzzlePage";


import WordSearchPage from "./pages/word-search/WordSearchPage";
import CreateWordSearch from "./pages/word-search/CreateWordSearch";
import WordSearchLevelsPage from "./pages/word-search/WordSearchLevels";

const RouteSwitch = () => {
    const token = localStorage.getItem("token");
    if (token) {
        setAuthToken(token);
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/sign-up" element={<SignUpPage/>}/>
                <Route path="/sign-in" element={<SignInPage/>}/>
                <Route path="/oauth/authorize" element={<OauthSignInPage/>}/>
                <Route path="/oauth/redirect/:client_id" element={<RedirectPage/>}/>
                <Route path="*" element={<PageNotFound/>}/>
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/sudoku/:id" element={<SudokuPage/>}/>
                    <Route path="/levels" element={<LevelSelectorPage/>}/>
                    <Route path="/create-sudoku/" element={<CreateSudokuPage/>}/>
                    <Route path="/other-games-page/" element={<OtherGamesPage/>}/>
                    <Route path="/sliding-puzzle/:id" element={<SlidingPuzzlePage/>}/>
                    <Route path="/sliding-levels" element={<SlidingSelectorPage/>}/>
                    <Route path="/create-sliding-puzzle" element={<CreateSlidingPuzzlePage/>}/>
                    <Route path="/crossword/:id" element={<CrosswordPage/>}/>
                    <Route path="/crossword-levels" element={<CrosswordSelectorPage/>}/>
                    <Route path="/create-crossword/" element={<CreateCrosswordPage/>}/>
                    <Route path="/word-guesser-old" element={<OldWordGuesser/>}/>
                    <Route path="/word-guesser/:id" element={<WordGuesser/>}/>
                    <Route path="/word-guesser" element={<RefreshWordGuesser/>}/>
                    <Route path="/wordsearch-levels" element={<WordSearchLevelsPage/>}/>
                    <Route path="/wordsearch" element={<WordSearchPage/>}/>
                    <Route path="/create-wordsearch" element={<CreateWordSearch/>}/>
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;