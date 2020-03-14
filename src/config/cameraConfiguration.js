const { innerWidth, innerHeight } = window;

const CAMERA_CONFIG = {
    fov: 70,
    rotationX: -26,
    rotationY: 32,
    rotationZ: -0.5,
    aspect: innerWidth / innerHeight,
    near: 1,
    far: 10000,
};

export default CAMERA_CONFIG;
