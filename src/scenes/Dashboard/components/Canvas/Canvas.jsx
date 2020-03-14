import React, { Component } from 'react';
import * as three from 'three';
import getOrbitControls from 'three-orbit-controls';
import GLTFExporter from 'three-gltf-exporter';

const OrbitControls = getOrbitControls(three);

class Canvas extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    threeD_scene = {};
    threeD_renderer = {};
    threeD_camera = {};
    threeD_controls = {};
    init = () => {
        const { camera } = this.props;
        const { fov, aspect, near, far, rotationX, rotationY, rotationZ } = camera;
        // Initialize 3d Scene
        this.threeD_scene = new three.Scene();
        // const { OrbitControls } = threeOrbit;
        // Initialize 3d Renderer and append in container
        // threeD_container = document.getElementById('ThreeJSCanvasContainer');
        this.threeD_renderer = new three.WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
        this.threeD_renderer.setSize(window.innerWidth, window.innerHeight);
        this.threeD_renderer.shadowMap.enabled = true;
        this.threeD_renderer.shadowMap.type = three.PCFSoftShadowMap;
        this.mount.appendChild(this.threeD_renderer.domElement);

        // Initialize 3d Camera
        this.threeD_camera = new three.PerspectiveCamera(fov, aspect, near, far);
        this.threeD_camera.position.set(rotationX, rotationY, rotationZ);

        // 3D Controls
        this.threeD_controls = new OrbitControls(this.threeD_camera, this.threeD_renderer.domElement);

        // 3D Lights
        var threeD_light3 = new three.AmbientLight(0xffffff);
        this.threeD_scene.add(threeD_light3);

        //Add base geometry for scene
        var sceneBaseGeometry = new three.PlaneGeometry(50, 50, 32);
        var sceneBasematerial = new three.MeshPhongMaterial({color: 0xbebebe, side: three.DoubleSide});
        var sceneBasePlaneMesh = new three.Mesh(sceneBaseGeometry, sceneBasematerial);
        this.threeD_scene.add(sceneBasePlaneMesh);
        sceneBasePlaneMesh.rotation.x = -1.57;
        sceneBasePlaneMesh.position.y = -0.02;
        var gridHelper = new three.GridHelper(50, 50);
        this.threeD_scene.add(gridHelper);
        this.add3dmodel();
    }

    addLineCylinder = (length, posX, posY, posZ, rotationX, rotationY, rotationZ) => {

        var towerLineCylinderGeometry = new three.CylinderBufferGeometry(0.1, 0.15, length, 32);


        var vertices = towerLineCylinderGeometry.attributes.position;

        // change upper vertices
        var v3 = new three.Vector3(); // temp vector
        for (let i = 0; i < vertices.count; i++) {
            //     v3.fromBufferAttribute(vertices, i); // set the temp vector
            //   v3.y = v3.y > 0 ? (v3.x * 0.5) + 2.5 : v3.y ; // change position by condition and equation
            // vertices.setY(i, v3.y); // set Y-component of a vertex
        }

        //var towerLineCylinderMaterial = new three.MeshPhongMaterial({color: 0xb9b923, emissive: 0x000000});
        var towerLineCylinderMaterial = new three.MeshPhongMaterial({

            color: 0x9b870c,
            specular: 0x050505,
            shininess: 100
        });
        const towerLineCylinderMesh = new three.Mesh(towerLineCylinderGeometry, towerLineCylinderMaterial);
        this.threeD_scene.add(towerLineCylinderMesh);

        towerLineCylinderMesh.position.x = posX;
        towerLineCylinderMesh.position.y = posY;
        towerLineCylinderMesh.position.z = posZ;
        towerLineCylinderMesh.rotation.set(rotationX, rotationY, rotationZ);

        return towerLineCylinderMesh;
    }

    add3dmodel = () => {
        var centerCylinderGeometry = new three.CylinderBufferGeometry(1, 1, 13, 32);
        var centerCylinderMaterial = new three.MeshStandardMaterial({color: 0xc0c0c0, emissive: 0x000000});

        var centrerCylinderMesh = new three.Mesh(centerCylinderGeometry, centerCylinderMaterial);
        this.threeD_scene.add(centrerCylinderMesh);
        centrerCylinderMesh.position.set(5, 6, 5);

        //Add 4 frmaes for tower geometry
        var towerLineLength = 12.16;
        this.addLineCylinder(towerLineLength, 0.5, towerLineLength / 2, 0.5, Math.PI / 36, 0, -Math.PI / 36);
        this.addLineCylinder(towerLineLength, 9.5, towerLineLength / 2, 0.5, Math.PI / 36, 0, Math.PI / 36);
        this.addLineCylinder(towerLineLength, 9.5, towerLineLength / 2, 9.5, -Math.PI / 36, 0, Math.PI / 36);
        this.addLineCylinder(towerLineLength, 0.5, towerLineLength / 2, 9.5, -Math.PI / 36, 0, -Math.PI / 36);

        var frame1LineLength = 11.66;
        this.addLineCylinder(frame1LineLength, 0.3, (frame1LineLength / 2) + 3 - 5.4, 4.7, Math.PI / 3.3, 0, -Math.PI / 60);
        this.addLineCylinder(frame1LineLength, 0.3, (frame1LineLength / 2) + 3 - 5.3, 5.3, -Math.PI / 3.3, 0, -Math.PI / 60);

        this.addLineCylinder(frame1LineLength, 9.7, (frame1LineLength / 2) + 3 - 5.4, 4.7, Math.PI / 3.3, 0, Math.PI / 60);
        this.addLineCylinder(frame1LineLength, 9.7, (frame1LineLength / 2) + 3 - 5.3, 5.3, -Math.PI / 3.3, 0, Math.PI / 60);

        this.addLineCylinder(frame1LineLength, 5.3, (frame1LineLength / 2) + 3 - 5.4, 0.3, Math.PI / 60, 0, Math.PI / 3.3);
        this.addLineCylinder(frame1LineLength, 4.7, (frame1LineLength / 2) + 3 - 5.3, 0.3, Math.PI / 60, 0, -Math.PI / 3.3);

        this.addLineCylinder(frame1LineLength, 5.3, (frame1LineLength / 2) + 3 - 5.4, 9.8, -2 * Math.PI / 60, 0, Math.PI / 3.3);
        this.addLineCylinder(frame1LineLength, 4.7, (frame1LineLength / 2) + 3 - 5.3, 9.8, -2 * Math.PI / 60, 0, -Math.PI / 3.3);


        var frame2LineLength = 10.05;
        this.addLineCylinder(frame2LineLength, 0.85, (frame2LineLength / 2) + 9 - 4.6, 4.8, Math.PI / 3.1, 0, -Math.PI / 65);
        this.addLineCylinder(frame2LineLength, 0.85, (frame2LineLength / 2) + 9 - 4.5, 5.2, -Math.PI / 3.1, 0, -Math.PI / 65);

        this.addLineCylinder(frame2LineLength, 9.15, (frame2LineLength / 2) + 9 - 4.6, 4.8, Math.PI / 3.1, 0, Math.PI / 60);
        this.addLineCylinder(frame2LineLength, 9.15, (frame2LineLength / 2) + 9 - 4.5, 5.2, -Math.PI / 3.1, 0, Math.PI / 65);

        this.addLineCylinder(frame2LineLength, 5.2, (frame2LineLength / 2) + 9 - 4.6, 0.8, 2 * Math.PI / 60, 0, Math.PI / 3.1);
        this.addLineCylinder(frame2LineLength, 4.8, (frame2LineLength / 2) + 9 - 4.5, 0.8, 2 * Math.PI / 60, 0, -Math.PI / 3.1);

        this.addLineCylinder(frame2LineLength, 5.2, (frame2LineLength / 2) + 9 - 4.6, 9.25, -2 * Math.PI / 60, 0, Math.PI / 3.1);
        this.addLineCylinder(frame2LineLength, 4.8, (frame2LineLength / 2) + 9 - 4.5, 9.25, -2 * Math.PI / 60, 0, -Math.PI / 3.1);


        var horizontal1LineLength = 9;
        this.addLineCylinder(horizontal1LineLength, 0.6, (horizontal1LineLength / 2) + 2.3, 5, Math.PI / 2, Math.PI / 2, 0);
        this.addLineCylinder(horizontal1LineLength, 9.4, (horizontal1LineLength / 2) + 2.3, 5, Math.PI / 2, Math.PI / 2, 0);

        this.addLineCylinder(horizontal1LineLength, 5, (horizontal1LineLength / 2) + 2.3, 0.5, 0, 0, Math.PI / 2);
        this.addLineCylinder(horizontal1LineLength, 5, (horizontal1LineLength / 2) + 2.3, 9.4, 0, 0, Math.PI / 2);

        var horizontal2LineLength = 8;
        this.addLineCylinder(horizontal2LineLength, 1, (horizontal2LineLength / 2) + 8, 5, Math.PI / 2, Math.PI / 2, 0);
        this.addLineCylinder(horizontal2LineLength, 9, (horizontal2LineLength / 2) + 8, 5, Math.PI / 2, Math.PI / 2, 0);

        this.addLineCylinder(horizontal2LineLength, 5, (horizontal2LineLength / 2) + 8, 0.9, 0, 0, Math.PI / 2);
        this.addLineCylinder(horizontal2LineLength, 5, (horizontal2LineLength / 2) + 8, 9, 0, 0, Math.PI / 2);


        //Code for flare connecting members
        var flareConnectingLineLength = 11.4;
        var flareLine1 = this.addLineCylinder(flareConnectingLineLength, 5, (flareConnectingLineLength / 2) + 6.3, 5, 0, -Math.PI / 4, Math.PI / 2);
        var flareLine2 = this.addLineCylinder(flareConnectingLineLength, 5, (flareConnectingLineLength / 2) + 6.3, 5, 0, Math.PI / 4, Math.PI / 2);

        flareLine1.material.color.setHex(0x000000);
        flareLine2.material.color.setHex(0x000000);
    }

    animate3DPage = () => {
        requestAnimationFrame(this.animate3DPage);
        this.threeD_controls.update();
        this.render3DPage();
    }

    render3DPage = () => {
        this.threeD_renderer.render(this.threeD_scene, this.threeD_camera);
        // console.log("HEeeeeeeeeelo", JSON.stringify(this.threeD_scene.toJSON()));
    }

    saveScene = () => {
        const exporter = new GLTFExporter();
        exporter.parse(this.threeD_scene, function ( gltf ) {
            function download(data, filename, type) {
                var file = new Blob([data], {type: type});
                if (window.navigator.msSaveOrOpenBlob) // IE10+
                    window.navigator.msSaveOrOpenBlob(file, filename);
                else { // Others
                    var a = document.createElement("a"),
                            url = URL.createObjectURL(file);
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(function() {
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);  
                    }, 0); 
                }
            }
            download(gltf, 'test', 'application/json');
        }, {
            binary: false,
        });
    }

    render() {
        return <div ref={ref => this.mount = ref} />;
    }

    componentDidMount() {
        this.init();
        this.animate3DPage();
    }
}

export default Canvas;