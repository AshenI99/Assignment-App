import {useEffect, useState} from "react";
import Loader from "./components/Loader/Loader";
import ErrorPopup from "./components/ErrorPopup/ErrorPopup";


const App = () => {

    // Save relevant chart data
    const [incomeData, setIncomeData] = useState({
        netIncome: [],
        totalRevenue: [],
        totalEquity: []
    });

    // Loading State of the app
    const [isLoading, setIsLoading] = useState(true);

    // Error state of the app
    const [errorMessage, setErrorMessage] = useState("");


    // Fetch data when the page loads
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData= async () => {
        setIsLoading(true);

        try {
            const income_sheet = await fetch("https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=demo");
            const income_data = await income_sheet.json();

            const balance_sheet = await fetch("https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=IBM&apikey=demo");
            const balance_data = await balance_sheet.json();

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
        } catch (err) {
            // Set error message
            setErrorMessage(err.message)
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className="app-holder">
            {isLoading ?
                <Loader/>
            :
            ""
            }

        </div>
    );
}

export default App;
