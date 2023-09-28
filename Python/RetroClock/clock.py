import tkinter as tk
from tkinter import colorchooser
from time import strftime

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

def show_buttons(event):
    btn_frame.pack(side='bottom', anchor='se', padx=10, pady=10)

def hide_buttons(event):
    btn_frame.pack_forget()

root = tk.Tk()
root.title("시계 위젯")

# Variables for colors and text
color_var = tk.StringVar(value='SeaGreen')
time_color_var = tk.StringVar(value='black')
btn_bg_color_var = tk.StringVar(value='#D32F2F')
pin_text_var = tk.StringVar(value='고정 ON')

# 상단 표시줄 제거
root.overrideredirect(True)

# 윈도우 설정
root.attributes('-alpha', 0.9)
root.configure(bg=color_var.get())

def time():
    string = strftime('%H:%M:%S %p')
    label.config(text=string)
    label.after(1000, time)

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

label = tk.Label(root, font=('DS-Digital', 40), foreground=time_color_var.get(), 
                 bg=color_var.get(), width=9, anchor='center')
label.pack(padx=10, pady=10, fill='both', expand=True)

btn_frame = tk.Frame(root, bg=color_var.get())
# Initially, the buttons are hidden

settings_button = tk.Button(btn_frame, text='⚙️', command=settings, font=('Arial', 12), bg=btn_bg_color_var.get(), fg='white')
settings_button.pack(side='left')

pin_button = tk.Button(btn_frame, textvariable=pin_text_var, command=toggle_pin, font=('Arial', 12), bg=btn_bg_color_var.get(), fg='white')
pin_button.pack(side='left')

close_button = tk.Button(btn_frame, text='✖', command=root.destroy, font=('Arial', 12), bg=btn_bg_color_var.get(), fg='white')
close_button.pack(side='left')

root.bind('<Button-1>', start_move)
root.bind('<ButtonRelease-1>', stop_move)
root.bind('<B1-Motion>', moving)

# Show/hide buttons on mouse enter/leave
label.bind('<Enter>', show_buttons)
btn_frame.bind('<Leave>', hide_buttons)

time()
root.mainloop()
