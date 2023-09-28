import tkinter as tk
from tkinter import font as tkFont  # 폰트 모듈을 가져옵니다.
from tkinter import colorchooser
from time import strftime

def time():
    string = strftime('%H:%M:%S %p')
    label.config(text=string)
    label.after(1000, time)

def update_colors():
    bg_color = color_var.get()
    fg_color = time_color_var.get()

    root.configure(bg=bg_color)
    label.config(fg=fg_color, bg=bg_color)
    btn_frame.config(bg=bg_color)
    settings_button.config(bg=btn_bg_color_var.get())
    pin_button.config(bg=btn_bg_color_var.get(), text=pin_text_var.get())
    close_button.config(bg=btn_bg_color_var.get())

def choose_bg_color():
    color = colorchooser.askcolor()[1]
    if color:
        color_var.set(color)

def choose_time_color():
    color = colorchooser.askcolor()[1]
    if color:
        time_color_var.set(color)

def toggle_pin():
    if root.winfo_toplevel().attributes('-topmost'):
        root.wm_attributes('-topmost', 0)
        pin_text_var.set('고정 ON')
    else:
        root.wm_attributes('-topmost', 1)
        pin_text_var.set('고정 OFF')

def settings():
    settings_win = tk.Toplevel(root)
    settings_win.title("Settings")

    tk.Label(settings_win, text="Background Color:").pack(padx=10, pady=5)
    tk.Entry(settings_win, textvariable=color_var).pack(padx=10, pady=5)
    tk.Button(settings_win, text="Choose", command=choose_bg_color).pack(padx=10, pady=5)

    tk.Label(settings_win, text="Time Color:").pack(padx=10, pady=5)
    tk.Entry(settings_win, textvariable=time_color_var).pack(padx=10, pady=5)
    tk.Button(settings_win, text="Choose", command=choose_time_color).pack(padx=10, pady=5)

    tk.Button(settings_win, text="Apply Changes", command=update_colors).pack(padx=10, pady=10)

def start_move(event):
    global x, y
    x = event.x
    y = event.y

def stop_move(event):
    x = None
    y = None

def moving(event):
    x_ = (event.x_root - x)
    y_ = (event.y_root - y)
    root.geometry(f'+{x_}+{y_}')

def show_buttons(event):
    btn_frame.pack(side='bottom', anchor='se', padx=2, pady=2)

def hide_buttons(event):
    # 버튼 프레임 위에 마우스가 없을 때만 숨깁니다.
    if not btn_frame.winfo_containing(event.x_root, event.y_root):
        btn_frame.pack_forget()

root = tk.Tk()

ds_digital_font = tkFont.Font(family="DS-Digital", size=30)

screen_width = root.winfo_screenwidth()
screen_height = root.winfo_screenheight()

window_width = 250
window_height = 80

x = screen_width - window_width
y = screen_height - window_height

root.geometry(f'{window_width}x{window_height}+{int(x)}+{int(y)}')

root.title("retro digital clock")

color_var = tk.StringVar(value='#C0C0C0')  # Classic gray
time_color_var = tk.StringVar(value='black')  # Updated to black
btn_bg_color_var = tk.StringVar(value='#C0C0C0')
pin_text_var = tk.StringVar(value='고정 ON')

root.overrideredirect(True)
root.configure(bg=color_var.get())
root.attributes('-alpha', 0.9)

label = tk.Label(root, font=ds_digital_font, foreground=time_color_var.get(),
                 bg=color_var.get(), width=12, anchor='center', relief='ridge')
label.pack(pady=2, fill='both', expand=True)

btn_frame = tk.Frame(root, bg=color_var.get(), relief='ridge')
settings_button = tk.Button(btn_frame, text='⚙️', command=settings, font=('Arial', 10), bg=btn_bg_color_var.get(), fg='black', height=1, width=5)
settings_button.pack(side='left', padx=1)
pin_button = tk.Button(btn_frame, textvariable=pin_text_var, command=toggle_pin, font=('Arial', 10), bg=btn_bg_color_var.get(), fg='black', height=1, width=7)
pin_button.pack(side='left', padx=1)
close_button = tk.Button(btn_frame, text='✖', command=root.destroy, font=('Arial', 10), bg='#FF0000', fg='white', height=1, width=5)
close_button.pack(side='left', padx=1)

# 드래그로 이동하는 기능
root.bind('<Button-1>', start_move)
root.bind('<ButtonRelease-1>', stop_move)
root.bind('<B1-Motion>', moving)

root.bind('<Enter>', show_buttons)
root.bind('<Leave>', hide_buttons)
btn_frame.bind('<Leave>', hide_buttons)

time()
root.mainloop()