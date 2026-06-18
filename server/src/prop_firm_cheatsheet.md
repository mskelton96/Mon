# Prop Coach AI: Prop Firm Challenges Cheat Sheet & Quick-Reference Guide
## Navigating Institutional Trading Evaluation Rules with Precision and Discipline

Passing a prop firm evaluation is the ultimate milestone for a developing trader. It grants you access to deep institutional capital (up to $100k, $200k, or more) while insulating your personal net worth from market risk. 

However, **over 90% of prop challenge participants fail—not because of poor technical setups, but because they do not understand or adhere to the strict, binding rulebooks of these firms.** 

This cheat sheet serves as an exhaustive reference comparing top Forex and Futures prop firms, detailing the hidden operational traps, and providing a definitive readiness checklist.

---

## 1. Industry Comparison: Top Forex vs. Futures Prop Firms

The prop firm space is broadly split into **Forex/CFD firms** (which use simulated broker feeds on MT4/MT5, DXTrade, or MatchTrader) and **Futures firms** (which trade direct CME exchange data via Tradovate, Rithmic, or NinjaTrader).

### Quick-Reference Comparison Matrix

| Prop Firm | Account Type | Profit Target (Eval) | Max Daily Loss | Max Overall Drawdown | Consistency Rules | News Trading Restrictions | Min. Days for First Payout | Evaluation Refund |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Apex Trader Funding** | Futures | 6% ($3,000 on $50k) | None | **Trailing Max** (3% - 5%) | 30% Profit Limit | Allowed | 10 active trading days | No (Promo-driven) |
| **Topstep** | Futures | 6% ($3,000 on $50k) | ~2% ($1,000 on $50k) | **End-of-Day (EOD)** | 50% Consistency | Allowed | 5 active trading days | No (Subscription) |
| **MyFundedFutures** | Futures | 6% ($3,000 on $50k) | None | **End-of-Day (EOD)** or Trailing | 40% Consistency | Allowed (mostly) | 10 active trading days | Yes (on select plans) |
| **FTMO** | Forex/CFDs | Phase 1: 10% <br> Phase 2: 5% | 5% (relative/daily) | 10% Static / Max | No strict %; profit must be organic | **Restricted** (2 min before/after high-impact news) | 14 days (or bi-weekly) | **Yes** (100% on first payout) |
| **FundedNext** | Forex/CFDs | Phase 1: 8% - 10% <br> Phase 2: 5% | 5% (daily) | 10% Overall | No strict % (varies on plans) | Allowed on select plans | 14 - 30 days | **Yes** (110% on first payout) |
| **The 5%ers** | Forex/CFDs | 8% - 10% (Phase 1) | 3% - 4% | 6% - 10% Max Static | No strict % | Allowed | No min. days (target-driven) | **Yes** (on first payout) |

---

## 2. Deep Dive: Operational Rules & Hidden Traps

### A. Daily Drawdown vs. Trailing Max Drawdown
The absolute most common way traders fail their accounts is by misunderstanding drawdown calculations.

#### 1. Daily Drawdown (Forex Standard: FTMO, FundedNext)
Daily drawdown is calculated relative to your **starting equity/balance at the daily reset (typically 5:00 PM EST)**.
*   **The Math:** If your $100,000 account starts the day at $102,000 (after yesterday's wins), and the daily loss limit is **5%**, your absolute daily stop-out level is:
    $$\text{Daily Stop Level} = \$102,000 - (\$102,000 \times 0.05) = \$96,900$$
*   **The Trap:** If you have open floating positions that dip your equity below $96,900 for even a fraction of a second, **your account is instantly closed, regardless of whether the trade subsequently reverses and finishes in profit.**

#### 2. End-of-Day (EOD) Drawdown (Topstep, MyFundedFutures Starter)
EOD drawdown is calculated strictly at the **close of the market session (typically 4:59 PM EST)**.
*   If your maximum drawdown is $2,000, your account is only failed if your account balance drops below that $2,000 threshold at the daily close.
*   **Benefit:** Floating drawdown *during* the day does not hurt your overall drawdown buffer, as long as you do not hit your hard intraday daily loss limit (if applicable) and your account recovers before the market close.

#### 3. Trailing Max Drawdown (The Apex "Intraday Peak" Trap)
Trailing Max Drawdown is calculated **in real-time based on your highest intraday peak equity**, including unrealized floating profits. This is the single most lethal trap for beginner traders.
*   **The Trap:** You have a $50,000 Apex account with a $2,500 trailing drawdown buffer. This means your initial invalidation threshold is **$47,500**.
*   You enter a trade. Price spikes up aggressively, and your trade is up **+$1,500** in floating (unrealized) profit. Your account equity peaks at **$51,500**.
*   Because your equity hit $51,500, the trailing threshold is instantly dragged up by $1,500:
    $$\text{New Stop-out Threshold} = \$51,500 - \$2,500 = \$49,000$$
*   You decide to hold, expecting a bigger move, but the market reverses. The trade drops back down, and you panic and close the trade at **break-even ($50,000)**.
*   *The Shocking Reality:* Even though you closed at break-even and lost $0 of your actual balance, your stop-out threshold remains locked at **$49,000**. You now only have **$1,000 of drawdown room left** on your account because you let that profit float!
*   **SMC Mitigation Rule:** When trading under a real-time trailing drawdown rule, you **must not** let winning trades reverse. You must scale out of positions, take partial profits aggressively, or move your stop-losses to active secure-points to lock in equity peaks.

---

## 3. The Consistency Rules (The "Anti-Gambling" Guardrails)
To prevent traders from "gambling" major news releases or NFP spikes with maximum size, prop firms enforce **Consistency Rules**.

### The 30% / 40% / 50% Rule
This rule dictates that **no single trading day can account for more than a specific percentage (e.g., 30% for Apex, 40% for MyFundedFutures, 50% for Topstep) of your total profit target.**
*   **Example (Apex $50k Account):**
    *   Profit Target to Pass: **$3,000**
    *   30% Consistency Limit: **$900**
    *   *The Scenario:* On Day 1, you catch a massive NQ short off a 15m Fair Value Gap and make **$2,100** in a single trade.
    *   *The Outcome:* You have **not** failed. However, you cannot pass the evaluation until you continue trading and generate enough profit over other days so that your $2,100 day represents **less than 30%** of your total overall profit.
    *   *The Formula to clear a concentrated day:*
        $$\text{Required Total Profit} = \frac{\text{Largest Day Profit}}{\text{Consistency } \%}$$
        $$\text{Required Total Profit} = \frac{\$2,100}{0.30} = \$7,000$$
    *   To pass, you must scale your account all the way to **$7,000 in total profit** (instead of just $3,000) so that your single lucky day complies with the consistency rule!

---

## 4. News Trading Constraints
Trading around major macroeconomic news (CPI, NFP, FOMC, Rate Decisions) represents massive, unmanageable risk for prop firms.

*   **Forex Firms (FTMO, etc.):** Often enforce a strict **"2-minute rule"**. You are prohibited from executing any new trades, or closing existing positions, between **2 minutes before and 2 minutes after** high-impact news releases on funded accounts.
    *   *Penalty:* Profits made during this window are confiscated, and repeated offenses lead to immediate account termination.
*   **Futures Firms (Apex, Topstep):** Generally **allow** news trading, but they strictly prohibit "news straddling" (placing buy-stop and sell-stop bracket orders right before news to catch the slippage). Extreme volatility and slippage can still cause instant daily limit breaches due to wide spreads.
*   **Rule of Thumb:** Professional, funded traders **flatten all positions 10-15 minutes prior to any red-folder news release.** Algorithmic market makers withdraw liquidity during news, leading to massive spread expansion and random stop-out slippage.

---

## 5. Payout Mechanics & Fee Refunds

### Fee Refunds
*   **Forex Firms:** Typically operate on a "Buy-in" model. When you pass your evaluation and receive your first successful payout on your funded account, the firm **fully refunds your initial registration fee (often adding an extra 10% bonus)**.
*   **Futures Firms:** Typically operate on a "Subscription" model or charge a separate "One-Time PA/Funded Fee" upon passing. These fees are **not refundable** but are offset by extremely low monthly entry costs (often running promos of 80% to 90% off evaluation fees).

### Payout Minimum Days & Buffers
*   Most firms require a minimum of **5 to 10 active trading days** (where a trade is opened and closed) during each payout cycle before a withdrawal can be requested.
*   **The Safety Buffer Trap:** Many futures firms require you to maintain a "minimum buffer" in your account before making a withdrawal. For example, on a $50k account, you might need to make at least $2,600 in profit before you can request a payout, and your withdrawal cannot dip the account below the $50,100 level. This is designed to ensure you do not instantly blow your account on the very next trade post-payout.

---

## 6. Pre-Challenge Readiness Checklist

Before you spend a single dollar of your capital on a prop firm evaluation, you must be able to check **YES** to every item on this checklist. This ensures you are treated as a business owner rather than a market gambler.

### [ ] Step 1: Technical Strategy Backtesting
*   *Requirement:* Have you logged at least **50 simulated/demo trades** using the SMC/ICT methodology (Liquidity Sweep -> MSS -> FVG/OB mitigation)?
*   *Validation:* Is your win-rate and risk-to-reward ratio mathematically positive, proving a long-term trading edge?

### [ ] Step 2: Drawdown Mastery
*   *Requirement:* Do you know the exact drawdown type of your chosen firm?
*   *Forex:* If daily drawdown, do you know how to calculate your absolute daily equity floor relative to the 5:00 PM EST reset?
*   *Futures:* If trailing intraday, do you have a strict rule to **never** let a trade run in 2:1 R:R profit and reverse completely back to loss?

### [ ] Step 3: Risk Sizing Calculation
*   *Requirement:* Do you know your exact maximum risk per trade in dollar format?
*   *Forex Example:* On a $100k account, risking **0.5%** means a hard stop of exactly **$500** per trade.
*   *Futures Example:* On a $50k account, risking **1.0%** means a hard stop of exactly **$500** per trade (e.g., 25 points on ES at $20/point per Mini, or 12.5 points on 2 Mini contracts).

### [ ] Step 4: Consistency Rules Compliance
*   *Requirement:* Are you committed to a structured daily profit target, rather than trying to pass the entire challenge in a single high-impact news event?
*   *Action:* Have you read and accepted the consistency limit (30%, 40%, or 50% max profit on a single day)?

### [ ] Step 5: Behavioral & Psychological Discipline
*   *Requirement:* Are you emotionally prepared to hit a stop-loss without instantly opening a revenge trade?
*   *Action:* Do you agree to apply the **"Three Strikes" rule**—closing your laptop and disconnecting from the market for the day after 2 consecutive losses?

---

### Master Summary: Passing is a Business Process
To pass, treat the prop firm's guidelines as your **operational business laws**. 
The market will reward your patience, but it will ruthlessly exploit any violation of risk limits. Use this cheat sheet as your daily armor, execute your edge, manage your drawdown buffer, and secure your institutional funding!
