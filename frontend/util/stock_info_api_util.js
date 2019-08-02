export const fetchInfo = () => {
    return $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/tops?token=${window.iexAPIKeySecret}&symbols=googl`,
    });
}

