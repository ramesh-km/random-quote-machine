import React, { useState, useEffect } from 'react';
import styles from '../src/app.module.scss';
import noInternet from './noInternet.png';

function QuoteBox() {
    const [quotes, setQuotes]= useState([{text: '', author: ''}]);
    const [randomNumber, setRandomNumber] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (window.navigator.onLine) {
            fetchQuotes().then(value => {
                setQuotes(value); 
                setRandomNumber(getRandomNumber(value.length));
                setIsLoading(false);
            });
        }
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = getRandomColor(0.5);
        if (!isLoading) {
            document.getElementById('quote-box').style.backgroundColor = getRandomColor(0.3);
        }
    });

    function onNewQuoteClick(event) {
        setRandomNumber(getRandomNumber(quotes.length));
    }

    const quote = quotes[randomNumber];
    const twitterIntentUrl = `https://twitter.com/intent/tweet?hashtags=quote&related=freecodecamp&text=${encodeURI(quote.text + '\n' + quote.author)}`;

    if (!window.navigator.onLine) {
        return (<div className={styles.noInternet} >
            <img src={noInternet} alt='Illustration for no internet connectivity'></img>
        </div>);
    }else if (isLoading) {
        return (<div className={styles.loader}>Loading...</div>)
    }

    return (
    <section id='quote-box'>
        <Quote quote={quote}/>
        <div id='quote-box-footer'>
            <div className='social'>
                <a id='tweet-quote'
                    href={twitterIntentUrl}
                    className='fa fa-twitter'
                    title='twitterIcon'
                    target='blank'
                >
                </a>
            </div>
            <button
                type='button'
                onClick={onNewQuoteClick}
                id='new-quote'
                className={styles.buttonOn}
            >
                New Quote
            </button>
        </div>
    </section>
    );
}

function Quote({quote}) {
    return (
        <div className='quote'>
            <p id='text'>{quote.text}</p>
            <i id='author'>{'- ' + quote.author}</i>
        </div>
    );
}

async function fetchQuotes() {
    console.log('fetching quotes');
    const response = await fetch('https://gist.githubusercontent.com/ramesh-km/8a1b3a2cce4a8eff58ed83e40c491f35/raw/');
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('for some unknow reason unable to fetch the quotes');
    }
}

function getRandomNumber(number) {
    return Math.floor((Math.random() * number));
}

function getRandomColor(alpha) {
    alpha = alpha || 0;
    return (`rgb(${getRandomNumber(255)}, ${getRandomNumber(255)}, ${getRandomNumber(255)}, ${alpha})`);
}

export default QuoteBox;
