# Instructions to run the application

1.  Download the code from GitHub
2.  Download and install Visual Studio Code editor https://code.visualstudio.com/download. This code editor is completely free and it works on every platform.
3.  Run Visual Studio Code and install the extension Live Server
    [Live Server - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
4.  Open the downloaded folder by selecting File- Open Folder
5.  Start Live Server by clicking on "Go Live" in the bottom right corner of VS Code. Once the browser is open, paste the url http://127.0.0.1:5500/index.html
6.  Index.html file is the entry point for the web application and displays on the web page a list of links for 6 models (people, planets, films, species, starships, vehicles).
7.  Details.html file retrieves the data from the API and displays the details about the item selected (ex, Luke Skywalker) + a list of links for people/ films/ planets/ species/ starships/ vehicles related to the selected item (ex, for people there is a list of links for 4 categories: films, species, vehicles, starships).
8.  Clicking on one of the links (ex, film A New Hope) will take the user to a page that shows the details about the item selected + a list of links to show details for each people/ films/ planets/ species/ starships/ vehicle.
