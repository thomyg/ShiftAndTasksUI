import * as React from 'react';
import styles from './ShiftAndTasks.module.scss';
import type { IShiftAndTasksProps } from './IShiftAndTasksProps';
import { Stack, Text, DefaultButton, PrimaryButton, Toggle, ProgressIndicator } from '@fluentui/react';
import { format } from 'date-fns';

interface ITask {
  id: string;
  title: string;
  isPriority: boolean;
  dueTime?: string;
  isCompleted: boolean;
}

interface IShift {
  day: string;
  startTime: string;
  endTime: string;
  department: string;
  isToday: boolean;
}

export default class ShiftAndTasks extends React.Component<IShiftAndTasksProps, {
  tasks: ITask[];
  currentDate: Date;
}> {
  constructor(props: IShiftAndTasksProps) {
    super(props);
    this.state = {
      currentDate: new Date(),
      tasks: [
        {
          id: 'task1',
          title: 'Restock iPhone display',
          isPriority: true,
          dueTime: '11:00 AM',
          isCompleted: false
        },
        {
          id: 'task2',
          title: 'Morning inventory count',
          isPriority: false,
          isCompleted: true
        }
      ]
    };
  }

  private shifts: IShift[] = [
    {
      day: 'TODAY',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
      department: 'Electronics Department',
      isToday: true
    },
    {
      day: 'TOMORROW',
      startTime: '10:00 AM',
      endTime: '6:00 PM',
      department: 'Electronics Department',
      isToday: false
    }
  ];

  private toggleTaskCompletion = (taskId: string): void => {
    this.setState(prevState => ({
      tasks: prevState.tasks.map(task => 
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    }));
  }

  public render(): React.ReactElement<IShiftAndTasksProps> {
    const { tasks, currentDate } = this.state;

    return (
      <div className={styles.shiftsAndTasks}>
        <Stack className={styles.header}>
          <Text variant="xxLarge" className={styles.title}>My Shifts & Tasks</Text>
          <Text variant="medium" className={styles.subtitle}>
            {format(currentDate, "EEEE, MMMM d, yyyy")}
          </Text>
        </Stack>

        <Stack className={styles.section}>
          <Text variant="large" className={styles.sectionTitle}>
            Current & Upcoming Shifts
          </Text>
          <Stack horizontal tokens={{ childrenGap: 16 }}>
            {this.shifts.map((shift, index) => (
              <Stack 
                key={index} 
                className={`${styles.shiftCard} ${shift.isToday ? styles.today : ''}`}
              >
                <Text variant="medium" className={styles.shiftDay}>{shift.day}</Text>
                <Text>{`${shift.startTime} - ${shift.endTime}`}</Text>
                <Text variant="small" className={styles.department}>
                  {shift.department}
                </Text>
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Stack horizontal tokens={{ childrenGap: 8 }} className={styles.actionButtons}>
          <DefaultButton text="🔄 Request Shift Swap" />
          <DefaultButton text="📅 Request Time Off" />
          <DefaultButton text="📋 View Full Schedule" />
        </Stack>

        <Stack className={styles.section}>
          <Text variant="large" className={styles.sectionTitle}>Today's Tasks</Text>
          <Stack tokens={{ childrenGap: 8 }}>
            {tasks.map(task => (
              <Stack horizontal key={task.id} tokens={{ childrenGap: 8 }} verticalAlign="center">
                <Toggle 
                  checked={task.isCompleted}
                  onChange={() => this.toggleTaskCompletion(task.id)}
                />
                <Stack>
                  <Text 
                    className={`${styles.taskTitle} ${task.isCompleted ? styles.completed : ''}`}
                    variant={task.isPriority ? "mediumPlus" : "medium"}
                  >
                    {task.title}
                    {task.isPriority && " (Priority)"}
                  </Text>
                  {task.dueTime && (
                    <Text variant="small" className={styles.dueTime}>
                      Due by {task.dueTime}
                    </Text>
                  )}
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Stack className={styles.section}>
          <Text variant="medium" className={styles.sectionTitle}>Task Progress</Text>
          <ProgressIndicator 
            label="4 of 10 tasks completed"
            percentComplete={0.4}
          />
        </Stack>

        <Stack horizontal tokens={{ childrenGap: 8 }} className={styles.actionButtons}>
          <PrimaryButton text="➕ Add New Task" />
          <DefaultButton text="📊 View All Tasks" />
        </Stack>
      </div>
    );
  }
}