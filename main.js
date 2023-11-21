const decimal_point = {
	BTC: 8,
	BUSD: 2,
	ETH: 8,
	USDC: 2,
	USDT: 2,
};
const quantity_init = {
	BTC: 1,
	BUSD: 1000,
	ETH: 1,
	USDC: 1000,
	USDT: 1000,
};
// const annual_yeild = {
// 	BTC: '1.00%',
// 	BUSD: '5.50%',
// 	ETH: '1.00%',
// 	USDC: '5.50%',
// 	USDT: '6.50%',
// };
const month_interest = {
	BTC: '30%',
	BUSD: '30%',
	ETH: '30%',
	USDC: '30%',
	USDT: '30%',
};
const deposit_period = {
	THREE_MONTHS: 0.25,
	HALF_YEAR: 0.5,
	ONE_YEAR: 1,
	THREE_YEARS: 3,
};

const PERCENTAGE = 100;

const containerEl = document.querySelector('.container');
const calculatorEl = containerEl.querySelector('.calculator');

/**
 * left side
 * input tag: deposit quantity
 * select tag: deposit asset type
 * select tag: ddeposit period
 */
const sideLeftEl = document.querySelector('.left');
const leftDepositQuantityInput = sideLeftEl.querySelector(
	'.deposit-quantity input[type=number]'
);
const leftDepositAssetSelectEl = sideLeftEl.querySelector(
	'.deposit-asset #asset'
);

const leftDeposit_periodSelectEl = sideLeftEl.querySelector(
	'.deposit-period #period'
);

/**
 * right sides
 */
const sideRightEl = document.querySelector('.right');
const rightDepositQuantityEl = sideRightEl.querySelector('.deposit-quantity');
const rightDepositQuantityType = sideRightEl.querySelector('.dq-type');
const rightAnnualYeildEl = sideRightEl.querySelector('.annual-yeild');
const rightProfitEl = sideRightEl.querySelector('.profit');
const rightProfitType = sideRightEl.querySelector('.profit-type');
/**
 *
 * 수량, 타입
 * 연 수익률
 *
 */

let selectedAssetType =
	leftDepositAssetSelectEl.options[leftDepositAssetSelectEl.selectedIndex]
		.text;

let selectedPeriodType =
	leftDeposit_periodSelectEl.options[leftDeposit_periodSelectEl.selectedIndex]
		.value;


setRightSideInit();
setTotalProfit();

leftDepositQuantityInput.addEventListener('input', (e) => {
	let number = Number(e.target.value);
	number = cutNumber(number, decimal_point[selectedAssetType]);

	setRightDepositQuantity(number);
	setTotalProfit();
});

leftDepositAssetSelectEl.addEventListener('change', (e) => {
	selectedAssetType = e.target.options[e.target.selectedIndex].text;

	setRightSideInit();
	setTotalProfit();
});

leftDeposit_periodSelectEl.addEventListener('change', (e) => {
	selectedPeriodType = e.target.value;

	setTotalProfit();
});

function setRightSideInit() {
	rightDepositQuantityType.textContent = selectedAssetType;

	rightDepositQuantityEl.textContent = quantity_init[
		selectedAssetType
	].toFixed(decimal_point[selectedAssetType]);

	rightAnnualYeildEl.textContent = month_interest[selectedAssetType];

	leftDepositQuantityInput.value = quantity_init[selectedAssetType];
}

function setRightDepositQuantity(number) {
	rightDepositQuantityEl.textContent = Number(number).toFixed(
		decimal_point[selectedAssetType]
	);
}

function cutNumber(number, digitsAfterDot) {
	const str = `${number}`;

	if (str.indexOf('.') === -1) {
		return number;
	} else {
		return str.slice(0, str.indexOf('.') + digitsAfterDot + 1);
	}
}

function setTotalProfit() {
	const profit =
		leftDepositQuantityInput.value *
		((parseFloat(month_interest[selectedAssetType]) * 12) / PERCENTAGE);
	const totalProfit =
		profit * deposit_period[selectedPeriodType] +
		Number(leftDepositQuantityInput.value);

	rightProfitEl.textContent = totalProfit.toFixed(
		decimal_point[selectedAssetType]
	);

	rightProfitType.textContent = selectedAssetType;
}
