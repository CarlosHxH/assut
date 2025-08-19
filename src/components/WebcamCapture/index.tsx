import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";

// Configurações otimizadas para mobile
const getVideoConstraints = () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        typeof navigator !== 'undefined' ? navigator.userAgent : ''
    );

    return {
        width: isMobile ? { min: 320, ideal: 720, max: 1920 } : 360,
        height: isMobile ? { min: 240, ideal: 480, max: 1080 } : 420,
        facingMode: "user",
        aspectRatio: isMobile ? { ideal: 1.5 } : undefined
    };
};

const AppCam = ({ captured, onCapture }: { captured?: string, onCapture: (e: string) => void }) => {
    const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
    const [mirrorVideo, setMirrorVideo] = useState<boolean>(true); // Espelhar por padrão
    const webcamRef = useRef<Webcam>(null);
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        if (captured) setUrl(captured);
    }, [captured])
    // Verificar se está em HTTPS (necessário para câmera em mobile)
    useEffect(() => {
        if (typeof window !== 'undefined' &&
            window.location.protocol === 'http:' &&
            window.location.hostname !== 'localhost' &&
            !window.location.hostname.includes('192.168') &&
            !window.location.hostname.includes('169.254')) {
            setError("HTTPS é necessário para usar a câmera em dispositivos móveis. Acesse via HTTPS ou localhost.");
        }
    }, []);

    // Capturar imagem
    const capture = useCallback(() => {
        try {
            const imageSrc = webcamRef.current?.getScreenshot({
                width: 360,
                height: 420
            });

            if (imageSrc) {
                // Se estiver espelhando a câmera frontal, corrigir a imagem capturada
                if (facingMode === "user" && mirrorVideo) {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const img = new window.Image();

                    img.onload = () => {
                        canvas.width = img.width;
                        canvas.height = img.height;

                        // Espelhar horizontalmente
                        ctx!.scale(-1, 1);
                        ctx!.drawImage(img, -img.width, 0);

                        // Converter de volta para base64
                        const correctedImageSrc = canvas.toDataURL('image/jpeg', 0.8);
                        setUrl(correctedImageSrc);
                        onCapture(correctedImageSrc);
                        setCaptureEnable(false);
                    };

                    img.src = imageSrc;
                } else {
                    setUrl(imageSrc);
                }
            } else {
                setError("Falha ao capturar imagem");
            }
        } catch (err) {
            setError("Erro ao capturar: " + (err as Error).message);
        }
    }, [webcamRef, facingMode, mirrorVideo, onCapture]);


    // Alternar entre câmera frontal e traseira
    const switchCamera = useCallback(() => {
        setFacingMode(prev => prev === "user" ? "environment" : "user");
    }, []);

    // Iniciar câmera
    const startCamera = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Verificar se o navegador suporta getUserMedia
            if (!navigator.mediaDevices?.getUserMedia) {
                throw new Error("Seu navegador não suporta acesso à câmera");
            }

            // Solicitar permissão explicitamente (ajuda em alguns dispositivos mobile)
            await navigator.mediaDevices.getUserMedia({
                video: getVideoConstraints(),
                audio: false
            });

            setCaptureEnable(true);
        } catch (err) {
            let errorMessage = "Erro ao acessar câmera: ";

            if (err instanceof Error && err.name === 'NotAllowedError') {
                errorMessage += "Permissão negada. Permita o acesso à câmera nas configurações do navegador.";
            } else if (err instanceof Error && err.name === 'NotFoundError') {
                errorMessage += "Câmera não encontrada.";
            } else if (err instanceof Error && err.name === 'NotSupportedError') {
                errorMessage += "Câmera não suportada neste dispositivo.";
            } else {
                errorMessage += (err as Error).message || "Erro desconhecido";
            }

            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Parar câmera
    const stopCamera = useCallback(() => {
        setCaptureEnable(false);
        setError(null);
    }, []);

    // Configurações de vídeo dinâmicas
    const videoConstraints = {
        ...getVideoConstraints(),
        facingMode
    };

    return (
        <div style={{
            padding: '20px',
            maxWidth: '100%',
            margin: '0 auto',
            fontFamily: 'Arial, sans-serif'
        }}>

            {error && (
                <div style={{
                    background: '#fee',
                    color: '#c33',
                    padding: '15px',
                    borderRadius: '5px',
                    marginBottom: '20px',
                    fontSize: '14px'
                }}>
                    {error}
                </div>
            )}
            {!isCaptureEnable && (
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <button
                        onClick={startCamera}
                        disabled={isLoading}
                        style={{
                            padding: '15px 10px',
                            fontSize: '18px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            opacity: isLoading ? 0.6 : 1
                        }}
                    >
                        {isLoading ? 'Carregando...' : 'Tirar Selfie'}
                    </button>
                </div>
            )}

            {isCaptureEnable && (
                <div>
                    <div className="flex" style={{
                        display: 'flex',
                        gap: '10px',
                        marginBottom: '15px',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        {/*<button
                            onClick={stopCamera}
                            style={{
                                padding: '10px 10px',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            Parar
                        </button>
                        <button
                            onClick={switchCamera}
                            style={{
                                padding: '10px 10px',
                                backgroundColor: '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            {facingMode === "user" ? "📷 Traseira" : "📷 Frontal"}
                        </button>
                        <button
                            onClick={() => setMirrorVideo(!mirrorVideo)}
                            style={{
                                padding: '10px 10px',
                                backgroundColor: '#6f42c1',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            {mirrorVideo ? "Espelho ON" : "Espelho OFF"}
                        </button>*/}
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '15px'
                    }}>
                        <div style={{
                            border: '2px solid #ddd',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            maxWidth: '100%'
                        }}>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={videoConstraints}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    maxWidth: '540px',
                                    display: 'block',
                                    // Espelhar apenas câmera frontal se habilitado
                                    transform: (facingMode === "user" && mirrorVideo) ? 'scaleX(-1)' : 'scaleX(1)',
                                    transition: 'transform 0.3s ease'
                                }}
                                onUserMediaError={(error: string | DOMException) => {
                                    console.error("Webcam error:", error);
                                    setError("Erro ao inicializar câmera: " + (error as Error).message || "");
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <button
                            type="button"
                            onClick={capture}
                            style={{
                                padding: '15px 30px',
                                fontSize: '18px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50px',
                                cursor: 'pointer',
                                boxShadow: '0 4px 8px rgba(0,123,255,0.3)'
                            }}
                        >
                            Capturar
                        </button>
                    </div>
                </div>
            )}

            {(url && !isCaptureEnable) && (
                <div style={{ marginTop: '20px' }}>
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '15px'
                    }}>
                        {false && <button
                            onClick={() => setUrl(null)}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            🗑️ Excluir
                        </button>}
                    </div>
                    <div style={{
                        textAlign: 'center',
                        border: '2px solid #ddd',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        display: 'inline-block',
                        maxWidth: '100%'
                    }}>
                        <Image
                            width={1000}
                            height={1000}
                            quality={100}
                            src={url || captured || ""}
                            alt="Captura da câmera"
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                display: 'block'
                            }}
                        />
                    </div>
                </div>
            )}

        </div>
    );
};

export default AppCam;