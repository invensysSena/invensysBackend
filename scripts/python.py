import pyautogui
import webbrowser
from time import sleep

# Abre WhatsApp Web en el navegador e inicia sesión manualmente escaneando el código QR

webbrowser.open("https://web.whatsapp.com/send?phone=+573003764571")

# Espera unos segundos para que se cargue WhatsApp Web y escanee el código QR
sleep(10)

# Bucle para enviar 10 mensajes

number_of_messages = 10
for _ in range(12):
    # Escribe el mensaje
    ms_num = number_of_messages*_ + 5454545*576767
    
    pyautogui.write(f"Bot {ms_num*2}🔒🔓{ms_num} level 1 ")
    
    # Presiona Enter para enviar el mensaje
    pyautogui.press("enter")
    
    # Espera un segundo antes de enviar el siguiente mensaje
    sleep(1)