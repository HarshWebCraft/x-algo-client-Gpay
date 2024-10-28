import React from "react";
import './StrategyCard.css'; // Add CSS styles
import image from '../images/StrategyImage.jpeg'; // Import the default image

const strategyData = [
  {
    id: 1,
    title: 'Brahmastra',
    strategyType: 'Auto Straddle',
    premium: true,
    capitalRequirement: 'Rs. 1,45,000 for 1X multiplier',
    description: 'This strategy trades in Bank Nifty weekly options. This is an intraday option selling strategy which sells both Call & Put options. Best suited for range bound markets and low volatile days.',
    time: '09:18 AM - 3:14 PM',
    days: 'Executes On - All Days',
  },
  {
    id: 2,
    title: 'Chakravyuh',
    strategyType: 'Bullish Call Spread',
    premium: false,
    capitalRequirement: 'Rs. 80,000 for 1X multiplier',
    description: 'This is a directional strategy for bullish markets. It involves buying and selling call options to limit risk and maximize gains.',
    time: '09:00 AM - 2:30 PM',
    days: 'Executes On - Mondays and Fridays',
  },
  {
    id: 3,
    title: 'SuryaKavach',
    strategyType: 'Protective Put',
    premium: true,
    capitalRequirement: 'Rs. 2,00,000 for 1X multiplier',
    description: 'This strategy is used to hedge an existing long position in the stock market by purchasing put options as insurance against downside risk.',
    time: '09:30 AM - 3:00 PM',
    days: 'Executes On - Tuesdays and Thursdays',
  },
  {
    id: 4,
    title: 'Dhanush',
    strategyType: 'Iron Condor',
    premium: false,
    capitalRequirement: 'Rs. 1,20,000 for 1X multiplier',
    description: 'A neutral strategy designed for low volatility markets by selling both a call and put spread.',
    time: '09:00 AM - 3:15 PM',
    days: 'Executes On - Wednesdays',
  },
  {
    id: 5,
    title: 'Agni',
    strategyType: 'Covered Call',
    premium: false,
    capitalRequirement: 'Rs. 90,000 for 1X multiplier',
    description: 'This strategy involves holding a long position in a stock and selling a call option to generate income from the premium.',
    time: '09:15 AM - 3:00 PM',
    days: 'Executes On - Tuesdays and Thursdays',
  },
  {
    id: 6,
    title: 'Vajra',
    strategyType: 'Bear Put Spread',
    premium: true,
    capitalRequirement: 'Rs. 1,50,000 for 1X multiplier',
    description: 'A bearish strategy where a trader buys put options at a higher strike price and sells the same number of puts at a lower strike price to limit risk.',
    time: '09:20 AM - 2:45 PM',
    days: 'Executes On - Mondays and Wednesdays',
  },
  {
    id: 7,
    title: 'Trishul',
    strategyType: 'Long Straddle',
    premium: true,
    capitalRequirement: 'Rs. 2,10,000 for 1X multiplier',
    description: 'This strategy involves buying both a call and put option on the same underlying asset with the same strike price and expiration date to benefit from significant price movement.',
    time: '09:10 AM - 3:10 PM',
    days: 'Executes On - All Days',
  },
  {
    id: 8,
    title: 'Garuda',
    strategyType: 'Long Call',
    premium: false,
    capitalRequirement: 'Rs. 75,000 for 1X multiplier',
    description: 'A simple bullish strategy where the trader buys call options with the expectation that the underlying asset will rise in value.',
    time: '09:00 AM - 2:45 PM',
    days: 'Executes On - Mondays, Wednesdays, and Fridays',
  },
  {
    id: 9,
    title: 'Vajrastra',
    strategyType: 'Short Iron Butterfly',
    premium: true,
    capitalRequirement: 'Rs. 1,70,000 for 1X multiplier',
    description: 'A limited-risk, limited-reward strategy that profits from low volatility by combining a bull put spread and a bear call spread.',
    time: '09:00 AM - 3:00 PM',
    days: 'Executes On - Thursdays',
  },
  {
    id: 10,
    title: 'Karna',
    strategyType: 'Long Put',
    premium: false,
    capitalRequirement: 'Rs. 85,000 for 1X multiplier',
    description: 'A bearish strategy where the trader buys put options expecting the price of the underlying asset to decrease significantly.',
    time: '09:20 AM - 2:50 PM',
    days: 'Executes On - Mondays and Thursdays',
  },
  {
    id: 11,
    title: 'Indra',
    strategyType: 'Calendar Spread',
    premium: true,
    capitalRequirement: 'Rs. 1,35,000 for 1X multiplier',
    description: 'This strategy involves simultaneously buying and selling options of the same type with the same strike price but different expiration dates, aiming to profit from time decay.',
    time: '09:05 AM - 3:00 PM',
    days: 'Executes On - Tuesdays and Fridays',
  },
  {
    id: 12,
    title: 'Rudra',
    strategyType: 'Ratio Spread',
    premium: false,
    capitalRequirement: 'Rs. 95,000 for 1X multiplier',
    description: 'A neutral strategy where a trader sells more options than they buy, typically at a lower strike price, to profit from moderate price movements.',
    time: '09:00 AM - 2:35 PM',
    days: 'Executes On - Wednesdays and Fridays',
  },
];

function StrategyCard() {
  return (
    <div className="card-container">
      {strategyData.map((strategy) => (
        <div key={strategy.id} className="card">
          <div className="card-header">
            <div className="header-left">
              <img
                src={image}
                alt="Icon"
                className="strategy-icon"
              />
              <div className="strategy-details">
                <h2>{strategy.title}</h2>
                <p className="strategy-type">Strategy: {strategy.strategyType}</p>
              </div>
            </div>
            {strategy.premium && <span className="premium-badge"><b>Premium</b></span>}
          </div>

          <div className="capital-info">
            <strong>Capital requirement : </strong> 
            <p>{strategy.capitalRequirement}</p>
          </div>

          <div className="strategy-info">
            <p>{strategy.description}</p>
          </div>

          <div className="execution-info">
            <div className="time-info">
              <i className="clock-icon">🕒</i> 
              {strategy.time}
            </div>
            <div className="days-info">
              <i className="calendar-icon">📅</i>
              {strategy.days}
            </div>
          </div>

          <div className="card-footer">
            <button className="subscribe-btn">Subscribe</button>
            <button className="learn-more-btn">Learn More</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StrategyCard;
