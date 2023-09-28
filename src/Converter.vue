<template>
    <h1>通貨換算器</h1>
    <h2>通貨換算器は、
        異なる通貨間の価値を変換する機能を提供します。
        ユーザーは、目標通貨の値を入力し、自動的に指定の通貨に変換された結果を見ることができます。
  </h2>
    <div>
      <p v-if="loading">loading...</p>
      <p v-else>
        1 {{ baseCurrency }} = {{ exchangeRate }} {{ targetCurrency }}
      </p>
    </div>

    <select v-model="baseCurrency" @change="updateInputValues">
      <option value="JPY">JPY</option>
      <option value="USD">USD</option>
      <option value="KRW">KRW</option>
    </select>
    <select v-model="targetCurrency" @change="updateInputValues">
      <option value="CNY">CNY</option>
      <option value="EUR">EUR</option>
      <option value="JPY">JPY</option>
    </select>

    <input type="number" :value="c" @change="setC"> 
    <input type="number" :value="f" @change="setF"> 

    
    <router-view></router-view>
  </template>

  <script>
  import axios from 'axios';
  import { ref, computed, watch } from 'vue'
  
  
  export default {
    data() {
      return {
        baseCurrency: 'JPY', 
        targetCurrency: 'CNY',  
        exchangeRate: null,  
        loading: true, 
        c:ref(0),
        f:ref(0)
      };
    },
    created() {
      this.fetchExchangeRate();
      watch([() => this.baseCurrency, () => this.targetCurrency,() =>this.exchangeRate], () => {
        this.fetchExchangeRate();
        });

    },
    methods: {
      fetchExchangeRate() {
        const apiUrl = `https://api.exchangerate-api.com/v4/latest/${this.baseCurrency}`;
  
        axios.get(apiUrl)
          .then((response) => {
            this.exchangeRate = response.data.rates[this.targetCurrency];
            this.loading = false;
            this.updateInputValues()
            
          })
          .catch((error) => {
            console.error('error：', error);
            this.loading = false;
          });
      },
      setC(e) {
      this.c = +e.target.value;
      this.f = this.c * this.exchangeRate;
    },
    setF(e) {
      this.f = +e.target.value;
      this.c = this.f /this.exchangeRate;
    },
    updateInputValues() {
    this.f = this.c * this.exchangeRate;
    this.c = this.f / this.exchangeRate;
    // console.log(this.baseCurrency)
    // console.log(this.targetCurrency)
    // console.log(this.exchangeRate)
    // console.log(this.fetchExchangeRate.exchangeRate)
    // console.log(this.c)
    // console.log(this.f)
    },
    watch: {
    baseCurrency(newValue) {
      this.updateInputValues();
    },
    targetCurrency(newValue) {
      this.updateInputValues();
    },

  },
  }
  };
  </script>