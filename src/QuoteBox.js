import React, { useState, useEffect } from 'react';
import styles from '../src/app.module.scss';

function QuoteBox() {
    const [quotes, setQuotes]= useState([{text: 'What is the best thing I can do right now ?', author: 'rk'}]);
    const [randomNumber, setRandomNumber] = useState(0);

    useEffect(() => {
        fetchQuotes().then(value => {
            setQuotes(value);
            setRandomNumber(getRandomNumber(value.length));
            document.body.style.backgroundColor = getRandomColor(0.5);
            document.getElementById('quote-box').style.backgroundColor = getRandomColor(0.3) ;
        });
    }, []);

    function onNewQuoteClick(event) {
        setRandomNumber(getRandomNumber(quotes.length));
        document.body.style.backgroundColor = getRandomColor(0.5);
        document.getElementById('quote-box').style.backgroundColor = getRandomColor(0.3);
    }

    const quote = quotes[randomNumber];
    const twitterIntentUrl = `https://twitter.com/intent/tweet?hashtags=quote&related=freecodecamp&text=${encodeURI(quote.text + '\n' + quote.author)}`;
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
    )
}

function Quote({quote}) {
    return (
        <div className='quote'>
            <p id='text'>{quote.text}</p>
            <i id='author'>{'- ' + quote.author}</i>
        </div>
    );
}

async function fetchQuotes(params) {
    if (!window.navigator.onLine) {
        console.log('No internet connectivity');
        return [{
            text: 'What is the best thing I can do right now ?',
            author: 'rk'
        }];
    }
    console.log('fetching quotes');
    const response = await fetch('https://gist.githubusercontent.com/ramesh-km/8a1b3a2cce4a8eff58ed83e40c491f35/raw/8f435105e71a6fdf86e97f734145636fc4ae79cd/quotes.json');
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('unable to fetch the quotes');
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