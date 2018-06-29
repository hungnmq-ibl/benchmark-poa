var Web3 = require('web3');
var ethTx = require('ethereumjs-tx');
var receivers =
    [
        '0x61b8d000f714ae067f949baa40704becc83fa29a',
        '0x2ca47b0e493a414c4834270d4466f70dbd1a2748',
        '0x713b4dbe03080239c71263a88a4d52fa9cbbcf9b',
        '0xb5138eb0b2d7247c6e85ef51b29707b18145e7e3',
        '0xeeddf1672ed96ce78d1f2ce1845988b5e5d20e48',
        '0x96f801db65526be4e0f7090dd7e7a67727272f3a',
        '0xaba6e1495731f82e7853b3ac87128b8750e4a2d8',
        '0x9646f46e2bfba3866d04359366850b6680e3f53b',
        '0x2269f4342f730ff748951eb13a7761c74c46d1cc',
        '0x63f7215cafae72d525fa40c688b1ec3e416a0a83',
        '0x14f083bf64b5dc513e184fc09ceeff050a5cf52f',
        '0xfb20d0699a99e1e224a072a82fe2328b9bbf1713',
        '0x6324a6ef73382b03cea3a50d13cc486ff681aff1',
        '0xac0f0cbafce834bbd44ba205df91d02cadafeeb0',
        '0xfa061540f9a0b8fd77704618bbd2dc574928b484',
        '0xc655be571f22159e29e3245dffcdcea426373959',
        '0xa556a99bb53ed0c162a2bafd2cb0f0842505aa5c',
        '0x9f595eca92f89e1533d855431367b4b713e75b92',
        '0x0ac31c2666ef87200b1a378655c9c99bed00e46e',
        '0x3bd6913c0ac4570f1e912ba86d3fba7bc8973002',
        '0xc26d370f1a129efd31daedef0c94e6d18952c37a',
        '0x6bebcca2599e7049e883e224cc9b833ae5cf99ce',
        '0xece9424f0315ebaf9a5d5d97e2afd53db5a610a8',
        '0xf65580032239cd847f931f635f5d955f390934be',
        '0x4f07dc26adceb9f51413720582910bd154f4759f',
        '0xd0d2032a15f30abdb6ab1e8b8aae2c50395fd38b',
        '0x8974f573f9d604a246bb38a6c1ae889c921ba7d5',
        '0xf8e7fa991a60c234ec6f939e0e876ef9947cb9dd',
        '0x07563ac72db1bea0b39d16766f16201f3444ed7c',
        '0xd189cb6135b2ab922e1d87ffedf5c07467696187',
        '0xf5568ec8192226b134eccfafa102972271e80ba8',
        '0xad6d9073a2400d6ac393d76a34ce27dafe5b1356',
        '0xa897dba3f9076813a63a017cf145c00ce88cb0cf',
        '0x3ec18c3a1b6ca5bec377f6bee2e598b29a083823',
        '0x9af3e8203a85e2b1de1ea79943fbff03f3ad80ba',
        '0x0366ca9de4569bb8644ea05b14efda8754d2587c',
        '0x3d20e6f83991d737e89afc588fc8393bfd061665',
        '0xcc93a85279158ea912c933b03b79983f3a10f704',
        '0xa218006c028f88ace98859f6da2c99fc48652e5f',
        '0xc12b50260e4ebb154280f55da0daa516f0ebde92',
        '0xcabeebcebdb8e1c633522acc5c4101354b5efc39',
        '0xc900bb8aad1c7f8d0f654b3104fed235c043d7da',
        '0x8601fa83b08aaba6267c27770924a506781f99bf',
        '0x059b4dbf00453db0151f8f72b158029f5bb818dc',
        '0xd458e977adde57dfb196c26f5421f34c7f4bdda9',
        '0xb54247ce7889ba1cbd939f76e6afe17a9d02abb6',
        '0x08fe1b63373220b64e922a9b820b5990d990071f',
        '0xf27f9438b5db8fd82b31f4c15d7812758e33ba8b',
        '0x929edd77da3b3531d1d7b1174a496ca7cd9f7978',
        '0x0eb81bdba794e8d647dd26c5cd862a33975b5cfb',
        '0x442ed3deb3699b3094ea967c763c0555a8a8c6a0',
        '0x3fcc58cccad0f6f0a42f1e1034e9e2ffe3775a5a',
        '0xbab83a467b379458a1aab4db8fece5803c92c892',
        '0xd93c6d9f566681ba09e4f3efe60b9101fcf3a802',
        '0x773ffcc31e6953d47f78814b9b7ed04481fb8dee',
        '0x2019ad168033e53c66109ddb4f71022da834b7f5',
        '0x666bf26cae5fe4d91f4997d4834e9edcd95084a5',
        '0xdf8d3721a3c455eed1bf9cb813da3b4695607190',
        '0x82bccd22358dafc7830a6e2904c2dbd81763f8f0',
        '0xfe0429a3ec3b7b8b81a15559a05add6fbb653dff'];
var PUBLIC_ADDR = 'BC18Dc2dfA9b16af8A8159D8d828904e9e433383'
var web3 = new Web3(new Web3.providers.HttpProvider("http://139.162.103.203:8545"));

web3.eth.getTransactionCount(PUBLIC_ADDR, 'pending', function (error, nonce) {
    var txList = [];
    for (var i = 0; i < receivers.length; i++) {
        var txParams = {
            nonce: '0x' + nonce.toString(16),
            gasPrice: '0x10',
            gasLimit: '0xF4240',
            to: receivers[i],
            value: '0xF635C9ADC5DEA00000'
        };

        var tx = new ethTx(txParams);
        tx.sign(Buffer.from('0cdc73d00f424756c71451773d7bdeaabb4bc55c2e83c46f3a7201569caa0866', 'hex'));
        var serializedTx = tx.serialize();
        var rawTx = '0x' + serializedTx.toString('hex');

        txList.push(rawTx);
        nonce++;
    }

    for (var i = 0; i < txList.length; i++) {
        web3.eth.sendSignedTransaction(txList[i], function (err, hash) {
            if (!err)
                console.log(hash);
            else
                console.log(err);
        });
    }
})