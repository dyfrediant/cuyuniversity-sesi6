let curToken = localStorage.getItem('cuytoken');
let curBalance = localStorage.getItem('cuypay');
let curBase = localStorage.getItem('base');
let curAccent = localStorage.getItem('accent');
let rechargeNom = 0;
let rechargePrice = 0;
let rechargeBalance = 0;


// Set Base
if(!curBase){localStorage.setItem('base', 'light');refreshBase();}
if(!curAccent){localStorage.setItem('accent', 'ocean');refreshAccent();}
if(!curToken){localStorage.setItem('cuytoken', 5)}
if(!curBalance){localStorage.setItem('cuypay', 10000)}

changeBase(curBase);
changeAccent(curAccent);
refreshToken();
refreshPay();
$(document).ready(function(){
    $('.--modal .--modal-header').append(`<a href="javascript:void(0)" onclick="closeModal()" class="--close-modal"><i class="fas fa-close"></i></a>`)
});
$('.--mobile-menu').on('click', function(){
    let target = $(this).attr('data-target');

    $(`#mob-${target}`).toggleClass('--active');
    $(`#mob-${target}`).siblings().removeClass('--active');
});
// User Actions
$('.--theme.--base').on('click', function(){
    let chosen = $(this).attr('data-id');

    if(curBase == chosen){
        return
    }

        if(curToken >= 1){
            buyTheme(1);
            changeBase(chosen);
            refreshBase();
        } else {
            noToken();
            $('.--error-notoken').addClass('--active');
            setTimeout(() => {
                $('.--error-notoken').removeClass('--active');
            }, 2000);
        }
});

$('.--theme.--accent').on('click', function(){
    let chosen = $(this).attr('data-id');

    if(curAccent == chosen){
        return
    } 

    if(curToken >= 2){
        buyTheme(2);
        changeAccent(chosen);
        refreshAccent();
    } else {
        noToken();
        $('.--error-notoken').addClass('--active');
        setTimeout(() => {
            $('.--error-notoken').removeClass('--active');
        }, 2000);
    }
});

$('.--token-nominal').on('click', function(){
    let nom = $(this).attr('data-nominal');
    let price = $(this).attr('data-price');
    $(this).siblings().removeClass('--active');
    $(this).addClass('--active');

    rechargeNom = parseInt(nom);
    rechargePrice = parseInt(price);
});

$('#payNow').on('click', function(){
    if(curBalance >= rechargePrice){
        rechargeToken(rechargeNom, rechargePrice);
        $('.--modal').removeClass('--active');
        $('.--notice').addClass('--active');
        setTimeout(() => {
            $('.--notice').removeClass('--active');
        }, 2000);
    } else {
        noBalance();
        $('.--error-token').addClass('--active');
        setTimeout(() => {
            $('.--error-token').removeClass('--active');
        }, 2000);
    }
});

$('.--pay-nominal').on('change', function(){
    rechargeBalance = parseInt($(this).val());
    rechargeBalance = rechargeBalance.toFixed(0);
});

$('#topup').on('click', function(){
    if(rechargeBalance >= 10000 & rechargeBalance <= 1000000){
        rechargePay(rechargeBalance);
    } else {
        $('.--error-pay').addClass('--active');
        setTimeout(() => {
            $('.--error-pay').removeClass('--active');
        }, 2000);
    }
    $('.--pay-nominal').val('');
    rechargeBalance = 0;
});

// Modals
$('.--open-modal').on('click', function(){
    let target = $(this).attr('data-target');
    $(`.--modal#${target}`).addClass('--active');
});

function closeModal(){
    $('.--modal.--active').removeClass('--active');
};

// Refresh Variables
function refreshBase(){curBase = localStorage.getItem('base')}
function refreshAccent(){curAccent = localStorage.getItem('accent')}
function refreshToken(){
    curToken = localStorage.getItem('cuytoken');
    $('.--token-status p').html(`<i class="fas fa-coins"></i> ${shortenNum(curToken)} tokens`);
    $('.--token-balance').html(`<i class="fas fa-coins"></i> ${shortenNum(curToken)} tokens`);

}
function refreshPay(){
    curBalance = localStorage.getItem('cuypay');
    $('.--pay-status p').html(`${shortenNum(curBalance)} IDR`);
    $('.--pay-balance').html(`${shortenNum(curBalance)} IDR`);
}

// Actions
function changeBase(color){
    localStorage.setItem('base', color);
    $('body').attr('id', color);
    $(`.--theme.--base[data-id="${color}"]`).siblings().removeClass('--active');
    $(`.--theme.--base[data-id="${color}"]`).addClass('--active');
}
function changeAccent(color){
    localStorage.setItem('accent', color);
    $('#accent').attr('href', `assets/css/${color}.css`);
    $(`.--theme.--accent[data-id="${color}"]`).siblings().removeClass('--active');
    $(`.--theme.--accent[data-id="${color}"]`).addClass('--active');
}

function shortenNum(number){
    let num = number;

    if(number < 1000){
            return `${num}`;
    } else if(number < 1000000){
        num = (number/1000).toFixed(0);
        return `${num}K`;
    } else if(number < 1000000000){
        num = (number/1000000).toFixed(1);
        return `${num}M`;
    } else {
        num = (number/1000000000).toFixed(2);
        return `${num}B`;
    }
}
function buyTheme(price){
    curToken = parseInt(curToken) - parseInt(price);
    localStorage.setItem('cuytoken', curToken);
    refreshToken();
}

function rechargeToken(nominal, price){
    curToken = parseInt(curToken) + parseInt(nominal);
    curBalance = parseInt(curBalance) - parseInt(price);
    localStorage.setItem('cuytoken', curToken);
    localStorage.setItem('cuypay', curBalance);
    refreshToken();
    refreshPay();
}

function rechargePay(nominal){
    curBalance = parseInt(curBalance) + parseInt(nominal);
    localStorage.setItem('cuypay', curBalance);
    refreshPay();
}

function noToken(){
    $('.--homepage-theme').addClass('shake');
    setTimeout(() => {
        $('.--homepage-theme').removeClass('shake');
    }, 500);
}

function noBalance(){
    $('.--modal-container').addClass('shake');
    setTimeout(() => {
        $('.--modal-container').removeClass('shake');
    }, 500);
}
