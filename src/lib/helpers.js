module.exports.notImplemented = (namespace) => {
    throw new Error(`[${namespace}] not implemented`);
};

module.exports.getNowSeconds = () => ~~(new Date().getTime() / 1000);
