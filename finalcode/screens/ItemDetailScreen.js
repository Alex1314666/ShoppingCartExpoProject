import {WebView} from "react-native-webview";

function ItemDetailScreen({navigation, route}) {
    return(
        <WebView
            source = {{html:`
                <div style=" text-align: center; padding-top: 20px">
                    <h1 style="font-size:40">${route.params.item.name}</h1>
                    <h1 style="font-size:40">Price: ${route.params.item.price}</h1>
                    <h1 style="font-size:40">Description: ${route.params.item.description}</h1>
                    <h1 style="font-size:40">Manufacturer: ${route.params.item.manufacturer}</h1>
                    <img src="${route.params.item.Image}" alt="Item Image" />
                </div>
            `}}
        />
    );
}

export default ItemDetailScreen;