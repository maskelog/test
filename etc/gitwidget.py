from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.lang import Builder

# Kivy Builder에서 위젯 디자인을 정의합니다.
Builder.load_string('''
<GitHubWidget>:
    orientation: 'vertical'
    GridLayout:
        id: grid
        cols: 7

    Label:
        id: date_label
        text: ''
        color: 0, 1, 0, 1  # 초록색
''')

class GitHubWidget(BoxLayout):
    def __init__(self, **kwargs):
        super(GitHubWidget, self).__init__(**kwargs)
        self.update_date_label()
        self.create_calendar()

    def update_date_label(self):
        # 년도와 날짜를 표시하는 함수입니다.
        import datetime
        now = datetime.datetime.now()
        self.ids.date_label.text = f'{now.year}-{now.month}-{now.day}'

    def create_calendar(self):
        # 365일 기준의 박스를 생성하는 함수입니다.
        import datetime
        now = datetime.datetime.now()

        grid = self.ids.grid
        for day in range(1, 366):
            box = BoxLayout(orientation='vertical')
            box.add_widget(Label(text=str(day)))
            box.add_widget(Label(id=f'day_{day}', background_color=(0, 1, 0, 1)))
            grid.add_widget(box)

    def set_achievement(self, day, achievement):
        # 날짜의 성취도에 따라 명도를 조절하는 함수입니다.
        label = self.ids[f'day_{day}']
        label.background_color[-1] = achievement

class GitHubApp(App):
    def build(self):
        return GitHubWidget()

if __name__ == '__main__':
    GitHubApp().run()
