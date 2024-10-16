
name: Node.js CI 𝙰𝚂𝙸𝚃𝙷𝙰-𝙼𝙳=jmhiHT4A#10hLYFmajo-Xv4c3dOec1BwZSLU28vUMtJNKYJe63I0

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Start application
      run: npm start
