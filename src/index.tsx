import { useState, useEffect } from 'react';
import { API_URL } from './consts';
import './style.css';

interface Product {
    id: string;
    image: string;
    title: string;
    price: number;
    code: string;
    category: string;
}

interface AdData {
    ad: {
        orientation: 'horizontal' | 'vertical';
        productsCount: number;
    };
    products: Product[];
}

interface AffiliateAdProps {
    code: string;
    fontColor?: string;
}

const AffiliateAd = (props: AffiliateAdProps) => {
    const [adData, set_adData] = useState<AdData>();

    const fontColor = props.fontColor || undefined;

    const getAdInfo = (code: string) => {
        fetch(
            `${API_URL}/products/ad-products/${code}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
            .then((response) => response.json())
            .then((result: AdData) => {
                set_adData(result);
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        getAdInfo(props.code);
    }, []);

    if (!adData) {
        return <p>Loading...</p>;
    }

    return (
        <div className={`productDisplay`}>
            {adData.products.map((product) => (
                <a href={`http://localhost:3000/products/product-redirect/${product.id}/${props.code}`} target="_blank" rel="noopener noreferrer" style={{ color: fontColor }}>
                    <div key={product.code} className={`productItem`}>
                        <img src={product.image} alt={product.title} className={`productImage`} />
                        <span className={`productPrice`} style={{ color: fontColor }}>{`R$ ${product.price}`}</span>
                        <span className={`productTitle`}>
                            {product.title}
                        </span>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default AffiliateAd;
