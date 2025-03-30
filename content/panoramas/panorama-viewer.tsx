import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const PanoramaViewer = () => {
  const containerRef = useRef(null);
  const [isVRSupported, setIsVRSupported] = useState(false);
  const [isInVR, setIsInVR] = useState(false);
  const [currentPanoIndex, setCurrentPanoIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [cameraRotation, setCameraRotation] = useState({ x: 0, y: 0 });
  
  // Sample panorama images - replace with your actual panoramas
  const panoramas = [
    '/api/placeholder/2000/500', // Replace with your actual panorama URLs
    '/api/placeholder/2000/500',
    '/api/placeholder/2000/500',
  ];
  
  // Titles for each panorama
  const panoramaTitles = [
    "Mountain Vista",
    "Ocean Sunset",
    "City Skyline"
  ];

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 0);
    camera.rotation.set(cameraRotation.x, cameraRotation.y, 0);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(renderer.domElement);
    }

    // Check VR support
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
        setIsVRSupported(supported);
        if (supported) {
          renderer.xr.enabled = true;
          
          // Add VR button
          const vrButton = document.createElement('button');
          vrButton.textContent = 'Enter VR';
          vrButton.className = 'absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors';
          vrButton.onclick = () => {
            if (!isInVR) {
              renderer.xr.setReferenceSpaceType('local');
              navigator.xr.requestSession('immersive-vr').then((session) => {
                renderer.xr.setSession(session);
                setIsInVR(true);
                
                session.addEventListener('end', () => {
                  setIsInVR(false);
                });
              });
            }
          };
          
          if (containerRef.current) {
            containerRef.current.appendChild(vrButton);
          }
        }
      });
    }
    
    // Create panorama sphere
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    // Flip the geometry inside out
    geometry.scale(-1, 1, 1);
    
    // Load texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(panoramas[currentPanoIndex]);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    
    // Add navigation controls
    const addNavigationControls = () => {
      const navContainer = document.createElement('div');
      navContainer.className = 'absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2';
      
      const prevButton = document.createElement('button');
      prevButton.innerHTML = '&#9664; Prev';
      prevButton.className = 'bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors';
      prevButton.onclick = () => {
        setCurrentPanoIndex((prev) => (prev > 0 ? prev - 1 : panoramas.length - 1));
      };
      
      const nextButton = document.createElement('button');
      nextButton.innerHTML = 'Next &#9654;';
      nextButton.className = 'bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors';
      nextButton.onclick = () => {
        setCurrentPanoIndex((prev) => (prev < panoramas.length - 1 ? prev + 1 : 0));
      };
      
      navContainer.appendChild(prevButton);
      navContainer.appendChild(nextButton);
      
      if (containerRef.current) {
        containerRef.current.appendChild(navContainer);
      }
    };
    
    addNavigationControls();
    
    // Add instruction overlay
    const addInstructions = () => {
      const instructionsOverlay = document.createElement('div');
      instructionsOverlay.className = 'absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded text-center';
      instructionsOverlay.innerHTML = `
        <div class="text-lg font-bold">${panoramaTitles[currentPanoIndex]}</div>
        <div class="text-sm mt-1">Click and drag to look around | Pinch to zoom</div>
      `;
      
      // Auto-hide instructions after 3 seconds
      setTimeout(() => {
        instructionsOverlay.style.opacity = '0';
        instructionsOverlay.style.transition = 'opacity 1s';
      }, 3000);
      
      if (containerRef.current) {
        containerRef.current.appendChild(instructionsOverlay);
      }
    };
    
    addInstructions();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Mouse controls for browser
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = cameraRotation.y;
    let targetRotationY = cameraRotation.x;
    let initialRotationX = 0;
    let initialRotationY = 0;
    let initialMouseX = 0;
    let initialMouseY = 0;
    
    const onMouseDown = (event) => {
      event.preventDefault();
      setIsDragging(true);
      initialMouseX = event.clientX;
      initialMouseY = event.clientY;
      initialRotationX = targetRotationX;
      initialRotationY = targetRotationY;
      containerRef.current.style.cursor = 'grabbing';
    };
    
    const onMouseMove = (event) => {
      if (isDragging) {
        mouseX = event.clientX - initialMouseX;
        mouseY = event.clientY - initialMouseY;
        targetRotationX = initialRotationX + mouseX * 0.004;
        targetRotationY = initialRotationY + mouseY * 0.004;
        targetRotationY = Math.max(Math.min(targetRotationY, Math.PI / 2 - 0.1), -Math.PI / 2 + 0.1);
      }
    };
    
    const onMouseUp = () => {
      setIsDragging(false);
      containerRef.current.style.cursor = 'grab';
    };
    
    // Touch controls for mobile browsers
    const onTouchStart = (event) => {
      if (event.touches.length === 1) {
        event.preventDefault();
        setIsDragging(true);
        initialMouseX = event.touches[0].clientX;
        initialMouseY = event.touches[0].clientY;
        initialRotationX = targetRotationX;
        initialRotationY = targetRotationY;
      }
    };
    
    const onTouchMove = (event) => {
      if (isDragging && event.touches.length === 1) {
        mouseX = event.touches[0].clientX - initialMouseX;
        mouseY = event.touches[0].clientY - initialMouseY;
        targetRotationX = initialRotationX + mouseX * 0.004;
        targetRotationY = initialRotationY + mouseY * 0.004;
        targetRotationY = Math.max(Math.min(targetRotationY, Math.PI / 2 - 0.1), -Math.PI / 2 + 0.1);
      }
    };
    
    const onTouchEnd = () => {
      setIsDragging(false);
    };
    
    containerRef.current.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    containerRef.current.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
    
    // Set initial cursor style
    containerRef.current.style.cursor = 'grab';
    
    // Animation loop
    const animate = () => {
      if (!isInVR) {
        requestAnimationFrame(animate);
      }
      
      // Smooth camera movement
      if (!renderer.xr.isPresenting) {
        camera.rotation.y += (targetRotationX - camera.rotation.y) * 0.1;
        camera.rotation.x += (targetRotationY - camera.rotation.x) * 0.1;
        setCameraRotation({ x: camera.rotation.x, y: camera.rotation.y });
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        containerRef.current.removeEventListener('touchstart', onTouchStart);
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
      }
      renderer.dispose();
    };
  }, [currentPanoIndex, isDragging, cameraRotation]);

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      <div ref={containerRef} className="w-full h-full"></div>
      <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm">
        {currentPanoIndex + 1} / {panoramas.length}
      </div>
      {isVRSupported && (
        <div className="absolute bottom-16 right-4 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
          VR Supported
        </div>
      )}
    </div>
  );
};

export default PanoramaViewer;
