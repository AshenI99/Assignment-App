import {useEffect, useState} from "react";
import {Navbar} from "react-bootstrap";

import Loader from "./components/Loader/Loader";
import Searchbar from "./components/Searchbar/Searchbar";
import ErrorPopup from "./components/ErrorPopup/ErrorPopup";


const APIKEY = "demo";

const App = () => {

    // Save relevant chart data
    const [incomeData, setIncomeData] = useState({
        netIncome: [],
        totalRevenue: [],
        totalEquity: []
    });

    // Loading State of the app
    const [isLoading, setIsLoading] = useState(false);

    // Error state of the app
    const [errorMessage, setErrorMessage] = useState("");

    const fetchData= async (stockValue) => {
        setIsLoading(true);

        try {
            const income_sheet = await fetch(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${stockValue}&apikey=${APIKEY}`);
            const income_data = await income_sheet.json();

            const balance_sheet = await fetch(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${stockValue}&apikey=${APIKEY}`);
            const balance_data = await balance_sheet.json();

            if((income_data?.Information && income_data?.Information?.includes("Our standard API rate limit is 25 requests per day")) || (balance_data?.Information && balance_data?.Information?.includes("Our standard API rate limit is 25 requests per day"))) {
                throw new Error("Daily Limit Reached")

            } else if(!income_data?.quarterlyReports || !balance_data?.quarterlyReports) {
                throw new Error("Incorrect Stock Name")
            }

            setIncomeData({
                netIncome: income_data?.quarterlyReports?.map((el) => {
                    return {
                        date: el?.fiscalDateEnding,
                        data: el?.netIncome
                    }
                }),
                totalRevenue: income_data?.quarterlyReports?.map((el) => {
                    return {
                        date: el?.fiscalDateEnding,
                        data: el?.totalRevenue
                    }
                }),
                totalEquity: balance_data?.quarterlyReports?.map((el) => {
                    return {
                        date: el?.fiscalDateEnding,
                        data: el?.totalShareholderEquity
                    }
                })
            })

            setErrorMessage("");
        } catch (err) {
            // Set error message
            setErrorMessage(err.message)
        } finally {
            setIsLoading(false);
        }
    }

    console.log(errorMessage)

    const onSearchClickHandling = (value) => {
        fetchData(value);
    }

    return (
        <div className="app-holder">

            {isLoading && <Loader/>}

            <div className="app-content">
                <Navbar expand="lg" className="navbar-custom">
                    <Navbar.Brand className="ps-3 text-white" href="#">Stock Scanner</Navbar.Brand>
                </Navbar>

                <div className="p-4">
                    <Searchbar onSearchHandle={onSearchClickHandling} />

                    {errorMessage ?
                        <>
                            <ErrorPopup message={errorMessage} />
                            <div className="error-div page-center-content text-white">{errorMessage}. Try again</div>
                        </>
                        :
                        ""
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
